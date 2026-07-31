import { ipcMain } from 'electron'
import { execFile } from 'child_process'
import fs from 'fs'
import path from 'path'
import crypto from 'crypto'

export function registerBilibiliIPC() {
  ipcMain.handle('bilibiliInfo', async (_e, input: string) => {
    try {
      if (!input.includes('bilibili.com') && !input.includes('b23.tv') && !/BV[a-zA-Z0-9]{10}/.test(input) && !/av\d+/i.test(input)) {
        return { error: '未识别 B站链接', parts: [] }
      }

      const flatResult = await new Promise<string>((resolve, reject) => {
        execFile('yt-dlp', ['--dump-json', '--flat-playlist', '--no-warnings', input], { timeout: 30000, maxBuffer: 10 * 1024 * 1024 }, (err, stdout) => err ? reject(err) : resolve(stdout))
      })
      const flatLines = flatResult.trim().split('\n').filter((l) => l.trim())
      const flatEntries = flatLines.map((l) => { try { return JSON.parse(l) } catch { return null } }).filter(Boolean) as any[]

      if (flatEntries.length > 1) {
        const episodes = flatEntries.map((e: any, i: number) => ({
          id: e.id || '',
          title: e.title || e.fulltitle || `P${i + 1}`,
          url: e.webpage_url || e.url || e.original_url || '',
          duration: e.duration || 0,
          thumbnail: e.thumbnail || (e.thumbnails?.[0]?.url) || ''
        }))
        const meta = flatEntries.find((e: any) => e.playlist_title) || flatEntries[0]
        return {
          isCollection: true,
          collectionTitle: meta?.playlist_title || meta?.title || '',
          collectionUrl: meta?.webpage_url || meta?.url || meta?.original_url || input,
          episodes
        }
      }

      const result = await new Promise<string>((resolve, reject) => {
        execFile('yt-dlp', ['--dump-json', '--no-playlist', '--no-warnings', input], { timeout: 30000, maxBuffer: 10 * 1024 * 1024 }, (err, stdout) => err ? reject(err) : resolve(stdout))
      })
      const info = JSON.parse(result)
      const formats = (info.formats || []).map((f: any) => {
        const vcodec = (f.vcodec || '').split('.')[0]
        const codecLabel = vcodec === 'avc1' ? 'AVC' : vcodec === 'hev1' ? 'HEVC' : vcodec === 'av01' ? 'AV1' : vcodec || ''
        const label = f.acodec !== 'none' && f.vcodec === 'none'
          ? `🎵 ${f.format || 'audio'}`
          : `🎬 ${f.format || f.resolution || ''}${codecLabel ? ` ${codecLabel}` : ''}`
        return {
          id: f.format_id, url: '', name: `${san(info.title || 'video')}_${f.format_id}.${f.ext}`,
          type: f.vcodec !== 'none' && f.acodec !== 'none' ? 'video' : f.acodec !== 'none' ? 'audio' : 'video',
          format: label, ext: f.ext, size: f.filesize || f.filesize_approx || 0,
          resolution: f.resolution || '', hasVideo: f.vcodec !== 'none', hasAudio: f.acodec !== 'none'
        }
      })

      const bestAudio = (info.formats || []).filter((f: any) => f.acodec !== 'none' && f.vcodec === 'none').sort((a: any, b: any) => (b.abr || 0) - (a.abr || 0))[0]
      const bestAudioId = bestAudio?.format_id || ''

      return {
        isCollection: false,
        title: info.title || '', cover: info.thumbnail || '', uploader: info.uploader || '',
        duration: info.duration || 0, bvid: info.id || '', bestAudioId,
        parts: [{ title: info.title, cid: 0, duration: info.duration || 0, formats }]
      }
    } catch (err: unknown) {
      const m = err instanceof Error ? err.message : String(err)
      if (m.includes('ENOENT')) return { error: 'yt-dlp 未安装。brew install yt-dlp', parts: [] }
      return { error: m, parts: [] }
    }
  })

  ipcMain.handle('bilibiliDownload', async (_e, url: string, formatId: string, bestAudioId: string, outputDir: string, baseName: string) => {
    const format = bestAudioId ? `${formatId}+${bestAudioId}` : formatId
    let finalBaseName = sanitizeFileName(baseName)
    let counter = 1
    while (true) {
      const testMp4 = path.join(outputDir, `${finalBaseName}.mp4`)
      const testWebm = path.join(outputDir, `${finalBaseName}.webm`)
      if ((!fs.existsSync(testMp4) && !fs.existsSync(testWebm)) || counter > 999) break
      finalBaseName = `${sanitizeFileName(baseName)} (${counter})`
      counter++
    }
    const outputPath = path.join(outputDir, `${finalBaseName}.%(ext)s`)
    const log: string[] = []
    try {
      if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true })
      log.push(`[yt-dlp] 下载格式: ${format}`)
      const ytdlpArgs = [
        '-f', format,
        '-o', outputPath,
        '--no-playlist',
        '--no-warnings',
        '--merge-output-format', 'mp4',
        url
      ]
      await new Promise<void>((resolve, reject) => {
        execFile('yt-dlp', ytdlpArgs, { timeout: 600000, maxBuffer: 10 * 1024 * 1024 }, (err) => {
          if (err) reject(err)
          else resolve()
        })
      })
      const files = fs.readdirSync(outputDir).filter((f) => f.startsWith(finalBaseName + '.') && !f.endsWith('.part') && !f.endsWith('.ytdl'))
      const finalFile = files.find((f) => /\.(mp4|mkv|webm|mov|flv|avi|m4v|mp3|m4a|aac|flac|ogg|wav)$/i.test(f))
      if (!finalFile) throw new Error('未找到输出文件')
      const fp = path.join(outputDir, finalFile)
      const ops = fs.statSync(fp).size; log.push(`完成: ${ops}B`)

      let thumbnailFile = ''
      try {
        const thumbArgs = ['--write-thumbnail', '--convert-thumbnails', 'jpg', '-o', outputPath, '--no-playlist', '--no-warnings', '--skip-download', url]
        await new Promise<void>((resolve) => {
          execFile('yt-dlp', thumbArgs, { timeout: 30000, maxBuffer: 1024 * 1024 }, () => resolve())
        })
        const allFiles = fs.readdirSync(outputDir)
        const thumbOrig = allFiles.find((f) => f.startsWith(finalBaseName + '.') && /\.(jpg|jpeg|png|webp)$/i.test(f))
        if (thumbOrig) {
          const thumbNew = `${finalBaseName}.thumb.jpg`
          if (thumbOrig !== thumbNew) fs.renameSync(path.join(outputDir, thumbOrig), path.join(outputDir, thumbNew))
          thumbnailFile = thumbNew
          log.push(`封面: ${thumbNew}`)
        }
      } catch { log.push('封面下载失败') }

      const hash = crypto.createHash('sha256').update(fs.readFileSync(fp)).digest('hex').slice(0, 16)
      const mf = path.join(outputDir, '.heartstone-meta.json')
      let md: Record<string, any> = {}
      if (fs.existsSync(mf)) { try { md = JSON.parse(fs.readFileSync(mf, 'utf-8')) } catch {} }
      md[finalFile] = { source: 'bilibili', title: finalBaseName, fileSize: ops, fileHash: hash, downloadedAt: new Date().toISOString(), format: 'yt-dlp', thumbnailFile }
      fs.writeFileSync(mf, JSON.stringify(md, null, 2))
      return { success: true, outputPath: fp, filename: finalFile, log }
    } catch (err: unknown) {
      const m = err instanceof Error ? err.message : String(err); log.push(`[FAIL] ${m}`)
      return { success: false, error: m, log }
    }
  })
}

function san(name: string): string { return sanitizeFileName(name) }
function sanitizeFileName(name: string): string { return name.replace(/[<>:"/\\|?*]/g, '_').slice(0, 200) }
