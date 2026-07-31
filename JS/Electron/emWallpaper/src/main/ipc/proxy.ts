import { ipcMain } from 'electron'

const HEADERS = { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' }

export function registerProxyIPC() {
  ipcMain.handle('scanUrl', async (_e, scanUrl: string) => {
    try {
      const ctrl = new AbortController(); const t = setTimeout(() => ctrl.abort(), 20000)
      const res = await fetch(scanUrl, { headers: HEADERS, redirect: 'follow', signal: ctrl.signal }); clearTimeout(t)
      if (!res.ok) return { error: `HTTP ${res.status}`, assets: [] }
      const html = await res.text(); const assets: Array<{ url: string; name: string; type: string }> = []; const seen = new Set<string>()
      const exts: Record<string, string> = { '.jpg': 'image', '.jpeg': 'image', '.png': 'image', '.gif': 'image', '.webp': 'image', '.svg': 'image', '.mp4': 'video', '.mov': 'video', '.avi': 'video', '.mkv': 'video', '.webm': 'video', '.mp3': 'audio', '.wav': 'audio', '.aac': 'audio', '.flac': 'audio', '.ogg': 'audio', '.m4a': 'audio', '.pdf': 'document', '.zip': 'archive', '.rar': 'archive' }
      const er = 'jpg|jpeg|png|gif|webp|svg|ico|bmp|mp4|mov|avi|mkv|webm|flv|mp3|wav|aac|flac|ogg|m4a|pdf|zip|rar|7z|tar|gz|doc|docx|xls|xlsx|ppt|pptx'
      const ps = [/<img[^>]+src=["']([^"']+)["']/gi, new RegExp(`<a[^>]+href=["']([^"']+\\.(?:${er}))["']`, 'gi'), /<video[^>]+src=["']([^"']+)["']/gi, /<audio[^>]+src=["']([^"']+)["']/gi]
      for (const re of ps) { let m; while ((m = re.exec(html)) !== null) { let au = m[1]; try { au = new URL(au, scanUrl).href } catch { continue }; if (seen.has(au)) continue; const em = au.match(/\.(\w{2,5})(?:\?|$)/); const ext = em ? `.${em[1].toLowerCase()}` : ''; const type = exts[ext]; if (!type) continue; seen.add(au); const nm = decodeURIComponent(new URL(au).pathname.split('/').pop() || 'download'); if (nm.length > 100) continue; assets.push({ url: au, name: nm, type }) } }
      return { assets: assets.slice(0, 100), count: assets.length }
    } catch (err) { return { error: err instanceof Error ? err.message : String(err), assets: [] } }
  })

  ipcMain.handle('extractVideo', async (_e, url: string) => {
    const { execFile } = require('child_process')
    try {
      const result = await new Promise<string>((resolve, reject) => {
        execFile('yt-dlp', ['--dump-json', '--no-playlist', '--flat-playlist', '--no-warnings', url], { timeout: 30000 }, (err: any, stdout: string) => err ? reject(err) : resolve(stdout))
      })
      const info = JSON.parse(result)
      const formats = (info.formats || []).filter((f: any) => f.vcodec !== 'none' && f.acodec !== 'none' && f.ext).map((f: any) => ({
        url: f.url, name: `${sanitize2(info.title || 'video')}_${f.format_id}.${f.ext}`, type: 'video', format: f.format_note || f.format_id, ext: f.ext, size: f.filesize || f.filesize_approx || 0, resolution: f.resolution || `${f.width}x${f.height}` || ''
      }))
      return { title: info.title || '', duration: info.duration || 0, thumbnail: info.thumbnail || '', uploader: info.uploader || '', formats }
    } catch (err: unknown) {
      const m = err instanceof Error ? err.message : String(err)
      if (m.includes('ENOENT') || m.includes('not found')) return { error: 'yt-dlp 未安装。brew install yt-dlp', formats: [] }
      return { error: m, formats: [] }
    }
  })
}

function sanitize2(name: string): string { return name.replace(/[<>:"/\\|?*]/g, '_').slice(0, 200) }
