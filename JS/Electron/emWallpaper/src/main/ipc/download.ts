import { BrowserWindow, ipcMain, Notification } from 'electron'
import fs from 'fs'
import path from 'path'
import { getPool } from '../workerPool'

const CHUNK_SIZE = 1024 * 1024 * 8
export const openFiles = new Map<string, fs.promises.FileHandle>()

const HEADERS = { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' }
const BILI_HEADERS = { ...HEADERS, Referer: 'https://www.bilibili.com', Origin: 'https://www.bilibili.com', Accept: '*/*' }

export function registerDownloadIPC() {
  ipcMain.handle('download', async (event, urls: string[], savePath: string, project: string) => {
    const win = BrowserWindow.fromWebContents(event.sender); if (!win) return []
    const pool = getPool()
    pool.setProgressCallback((taskId, data) => sendProgress(win, taskId, { phase: 'downloading', chunkIndex: data.chunkIndex, loaded: data.loaded, total: data.total, speed: data.speed }))
    const pd = path.join(savePath, project || '默认素材'); if (!fs.existsSync(pd)) fs.mkdirSync(pd, { recursive: true })
    const results: Array<{ taskId: string; filename: string }> = []
    const MAX_CONCURRENT = 3
    const pending = [...urls]
    let running = 0

    const processNext = async () => {
      while (running < MAX_CONCURRENT && pending.length > 0) {
        const url = pending.shift()!
        running++
        const fn = sanitize(extractFilename(url)); let fp = path.join(pd, fn); let c = 1
        const ext = path.extname(fn); const base = path.basename(fn, ext)
        while (fs.existsSync(fp)) { fp = path.join(pd, `${base}(${c})${ext}`); c++ }
        const tid = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
        results.push({ taskId: tid, filename: path.basename(fp) })
        downloadFile(url, fp, tid, win).finally(() => {
          running--
          processNext()
        })
      }
    }

    processNext()
    while (running > 0 || pending.length > 0) {
      await new Promise((r) => setTimeout(r, 200))
    }
    return results
  })

  ipcMain.handle('cancelDownload', async (_e, taskId) => {
    getPool().cancelTask(taskId)
    const fd = openFiles.get(taskId)
    if (fd) { try { await fd.close() } catch {}; openFiles.delete(taskId) }
  })

}

async function downloadFile(url: string, filePath: string, taskId: string, win: BrowserWindow) {
  const pool = getPool(); let fd: fs.promises.FileHandle | null = null
  try {
    const isBili = url.includes('bilivideo.com'); const dlHeaders = isBili ? BILI_HEADERS : HEADERS
    const headRes = await fetch(url, { method: 'HEAD', headers: dlHeaders })
    const fileSize = parseInt(headRes.headers.get('content-length') || '0', 10)
    if (!fileSize) throw new Error('无法获取文件大小')
    const cl = Math.ceil(fileSize / CHUNK_SIZE)
    const dir = path.dirname(filePath); if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
    pool.registerTask(taskId, fileSize)
    fd = await fs.promises.open(filePath, 'w'); openFiles.set(taskId, fd)
    sendProgress(win, taskId, { phase: 'starting', total: fileSize, chunks: cl, filename: path.basename(filePath) })
    let bw = 0; const ps: Promise<void>[] = []
    for (let i = 0; i < cl; i++) {
      const start = i * CHUNK_SIZE; const end = Math.min((i + 1) * CHUNK_SIZE - 1, fileSize - 1)
      ps.push(pool.downloadChunk({ url, start, end, index: i, taskId, headers: dlHeaders }).then(async (data) => {
        if (!openFiles.has(taskId)) return; await fd!.write(new Uint8Array(data), 0, data.byteLength, start); bw += data.byteLength
        sendProgress(win, taskId, { phase: 'downloading', downloaded: bw, total: fileSize, speed: 0 })
      }))
    }
    await Promise.all(ps); if (!openFiles.has(taskId)) return
    await fd.close(); openFiles.delete(taskId)
    sendProgress(win, taskId, { phase: 'complete', filePath, filename: path.basename(filePath), total: fileSize, downloaded: fileSize })
    if (Notification.isSupported()) new Notification({ title: '下载完成', body: `${path.basename(filePath)}\n${path.dirname(filePath)}`, silent: false }).show()
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err); sendProgress(win, taskId, { phase: 'error', error: msg })
    if (fd) { try { await fd.close() } catch {}; openFiles.delete(taskId) }; try { fs.unlinkSync(filePath) } catch {}
  }
}

function sendProgress(win: BrowserWindow, taskId: string, data: Record<string, unknown>) {
  try { win.webContents.send('download-progress', { taskId, ...data }) } catch {}
}

function extractFilename(url: string): string {
  try { const p = decodeURIComponent(new URL(url).pathname).split('/').filter(Boolean); return p[p.length - 1] || 'download' } catch { return 'download' }
}
function sanitize(name: string): string { return name.replace(/[<>:"/\\|?*]/g, '_').slice(0, 200) }
