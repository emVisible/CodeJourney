import { dialog, ipcMain, shell } from 'electron'
import { execFile } from 'child_process'
import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
import { getWin } from '../utils'
import { downloadFile } from '../wallpaper'

export function registerAssetsIPC() {
  ipcMain.on('quitApp', () => {
    const { app } = require('electron')
    app.quit()
  })

  ipcMain.handle('checkSavePath', async (event) => {
    const win = getWin(event); if (!win) return undefined
    const res = await dialog.showOpenDialog(win, { properties: ['openDirectory'] })
    return res.canceled === false && res.filePaths.length > 0 ? res.filePaths[0] : undefined
  })

  ipcMain.handle('getDesktopPath', async () => {
    const { app } = require('electron')
    return app.getPath('desktop')
  })

  ipcMain.handle('scanDirectory', async (_e, dirPath: string) => {
    try {
      if (!fs.existsSync(dirPath)) return { files: [] }
      const entries = fs.readdirSync(dirPath, { withFileTypes: true }).filter((e) => e.isFile())
      const thumbExtensions = ['.thumb.jpg', '.thumb.png', '.thumb.webp']
      const isThumb = (name: string) => thumbExtensions.some((ext) => name.endsWith(ext))
      const files = entries.filter((e) => !isThumb(e.name)).map((e) => {
        const fp = path.join(dirPath, e.name); const s = fs.statSync(fp)
        const base = e.name.replace(/\.[^.]+$/, '')
        const thumbName = thumbExtensions.find((t) => entries.some((ent) => ent.name === `${base}${t}`))
        return {
          name: e.name, path: fp, size: s.size, ext: path.extname(e.name), mtime: s.mtimeMs,
          thumbPath: thumbName ? path.join(dirPath, thumbName) : undefined
        }
      }).sort((a, b) => b.mtime - a.mtime)
      return { files }
    } catch (err) { return { files: [], error: err instanceof Error ? err.message : String(err) } }
  })

  ipcMain.handle('openItemInFolder', async (_e, fp: string) => shell.showItemInFolder(fp))

  ipcMain.handle('getFileInfo', async (_e, fp: string) => {
    const ext = path.extname(fp).toLowerCase(); const s = fs.statSync(fp)
    const info: Record<string, string | number> = { size: s.size, ext }
    const vexts = ['.mp4', '.mov', '.avi', '.mkv', '.webm', '.flv']; const iexts = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp']
    if (vexts.includes(ext) || iexts.includes(ext)) {
      try {
        const r = await new Promise<string>((res, rej) => execFile('ffprobe', ['-v', 'quiet', '-print_format', 'json', '-show_format', '-show_streams', fp], { timeout: 10000 }, (err, o) => err ? rej(err) : res(o)))
        const d = JSON.parse(r); const vs = d.streams?.find((s: any) => s.codec_type === 'video'); const as = d.streams?.find((s: any) => s.codec_type === 'audio')
        if (vs) { info.codec = vs.codec_name; info.width = vs.width; info.height = vs.height; if (d.format?.duration) info.duration = parseFloat(d.format.duration) }
        else if (as && d.format?.duration) { info.codec = as.codec_name; info.duration = parseFloat(d.format.duration) }
      } catch {}
    }
    return info
  })

  ipcMain.handle('deleteFile', async (_e, fp: string) => {
    try { fs.unlinkSync(fp); return { success: true } } catch (err) { return { success: false, error: err instanceof Error ? err.message : String(err) } }
  })

  ipcMain.handle('readLocalFile', async (_e, fp: string) => {
    try {
      const data = fs.readFileSync(fp); const ext = path.extname(fp).toLowerCase()
      const m: Record<string, string> = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.gif': 'image/gif', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.bmp': 'image/bmp', '.ico': 'image/x-icon', '.mp4': 'video/mp4', '.mp3': 'audio/mpeg', '.wav': 'audio/wav', '.aac': 'audio/aac', '.flac': 'audio/flac', '.ogg': 'audio/ogg', '.m4a': 'audio/mp4', '.mkv': 'video/x-matroska', '.mov': 'video/quicktime', '.webm': 'video/webm', '.avi': 'video/x-msvideo', '.flv': 'video/x-flv', '.wmv': 'video/x-ms-wmv', '.m4v': 'video/mp4', '.wma': 'audio/x-ms-wma' }
      return { data: data.toString('base64'), mime: m[ext] || 'application/octet-stream' }
    } catch (err) { return { error: err instanceof Error ? err.message : String(err) } }
  })

  ipcMain.handle('getAssetMeta', async (_e, filePath: string) => {
    try {
      const mf = path.join(path.dirname(filePath), '.heartstone-meta.json')
      if (!fs.existsSync(mf)) return null
      return JSON.parse(fs.readFileSync(mf, 'utf-8'))[path.basename(filePath)] || null
    } catch { return null }
  })

  ipcMain.handle('extractVideoFrame', async (_e, fp: string) => {
    try {
      if (!fs.existsSync(fp)) return null
      const buf = await new Promise<Buffer>((res, rej) => {
        execFile('ffmpeg', ['-ss', '0', '-i', fp, '-vframes', '1', '-s', '320x-1', '-f', 'image2pipe', '-vcodec', 'mjpeg', 'pipe:1'], { timeout: 15000, maxBuffer: 10 * 1024 * 1024 }, (err, stdout, stderr) => {
          if (stdout && stdout.length > 100) return res(Buffer.from(stdout))
          rej(err || new Error(stderr.toString().slice(0, 200) || 'empty'))
        })
      })
      return `data:image/jpeg;base64,${buf.toString('base64')}`
    } catch { return null }
  })

  ipcMain.handle('directDownload', async (_event, url: string, filePath: string, provider?: string) => {
    try {
      let finalPath = filePath
      const dir = path.dirname(filePath)
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })

      const ext = path.extname(filePath)
      const base = path.basename(filePath, ext)
      let counter = 1
      while (fs.existsSync(finalPath)) {
        finalPath = path.join(dir, `${base} (${counter})${ext}`)
        counter++
      }

      await downloadFile(url, finalPath, provider)

      const hash = crypto.createHash('sha256').update(fs.readFileSync(finalPath)).digest('hex').slice(0, 16)
      const metaFile = path.join(dir, '.heartstone-meta.json')
      let metaData: Record<string, any> = {}
      if (fs.existsSync(metaFile)) { try { metaData = JSON.parse(fs.readFileSync(metaFile, 'utf-8')) } catch {} }
      metaData[path.basename(finalPath)] = {
        sourceUrl: url, provider: provider || 'direct',
        fileSize: fs.statSync(finalPath).size,
        fileHash: hash, downloadedAt: new Date().toISOString()
      }
      fs.writeFileSync(metaFile, JSON.stringify(metaData, null, 2))
      return { success: true, filePath: finalPath }
    } catch (err: any) {
      return { success: false, error: err.message }
    }
  })
}
