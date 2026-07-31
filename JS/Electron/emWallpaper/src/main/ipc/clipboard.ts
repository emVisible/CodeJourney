import { clipboard, BrowserWindow, ipcMain, Notification } from 'electron'

let monitorTimer: ReturnType<typeof setInterval> | null = null
let lastText = ''
let mainWin: BrowserWindow | null = null
let detectConfig = { enabled: true, bilibili: true, youtube: true }

const BILI_RE = /bilibili\.com|b23\.tv|BV[a-zA-Z0-9]{10}|av\d+/i
const YT_RE = /youtube\.com|youtu\.be/i

export function registerClipboardIPC(win: BrowserWindow) {
  mainWin = win

  ipcMain.handle('clipboard:config', async (_e, cfg: { enabled: boolean; bilibili: boolean; youtube: boolean }) => {
    detectConfig = cfg
  })

  ipcMain.handle('clipboard:start', async () => {
    if (monitorTimer) return
    monitorTimer = setInterval(() => {
      try {
        const text = clipboard.readText().trim()
        if (!text || text === lastText) return
        lastText = text

        let type = ''
        let label = ''
        if (BILI_RE.test(text) && detectConfig.bilibili && detectConfig.enabled) { type = 'bilibili'; label = 'B站' }
        else if (YT_RE.test(text) && detectConfig.youtube && detectConfig.enabled) { type = 'youtube'; label = 'YouTube' }
        else return

        const shortUrl = text.length > 50 ? text.slice(0, 50) + '...' : text
        const n = new Notification({
          title: `检测到 ${label} 视频`,
          body: shortUrl,
          silent: false
        })
        n.on('click', () => {
          mainWin?.show()
          mainWin?.focus()
          mainWin?.webContents.send('clipboard-parse', { url: text, type })
        })
        n.show()
      } catch { /* clipboard read may fail */ }
    }, 1500)
  })

  ipcMain.handle('clipboard:stop', async () => {
    if (monitorTimer) { clearInterval(monitorTimer); monitorTimer = null }
  })

  ipcMain.handle('clipboard:clearLast', async () => {
    lastText = ''
  })
}
