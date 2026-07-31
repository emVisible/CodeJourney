import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import { BrowserWindow, app, shell, Tray, Menu, nativeImage, ipcMain, screen, protocol } from 'electron'
import path from 'path'
import fs from 'fs'
import { registerAllIPC } from './ipcMain'

if (process.platform === 'darwin') {
  app.disableHardwareAcceleration()
}

let mainWindow: BrowserWindow | null = null
let tray: Tray | null = null
let isQuitting = false

function getIconPath(): string {
  if (app.isPackaged) {
    return path.join(process.resourcesPath, 'icon.png')
  }
  return path.join(app.getAppPath(), 'resources', 'icon.png')
}

function loadWindowBounds(): { x?: number; y?: number; width: number; height: number } | null {
  try {
    const configPath = path.join(app.getPath('userData'), 'window-bounds.json')
    if (fs.existsSync(configPath)) {
      return JSON.parse(fs.readFileSync(configPath, 'utf-8'))
    }
  } catch { /* ignore */ }
  return null
}

function createWindow(): void {
  const iconPath = getIconPath()
  const saved = loadWindowBounds()
  const defaultWidth = 1366
  const defaultHeight = 768
  let winX: number | undefined
  let winY: number | undefined
  let winW = defaultWidth
  let winH = defaultHeight
  if (saved && 'x' in saved && 'y' in saved) {
    const displays = screen.getAllDisplays()
    const onScreen = displays.some((d) => {
      const wa = d.workArea
      return !(saved.x! + saved.width! < wa.x || saved.x! > wa.x + wa.width || saved.y! + saved.height! < wa.y || saved.y! > wa.y + wa.height)
    })
    if (onScreen) { winX = saved.x; winY = saved.y; winW = saved.width; winH = saved.height }
  } else if (saved) {
    winW = saved.width; winH = saved.height
  }
  mainWindow = new BrowserWindow({
    width: winW,
    height: winH,
    x: winX, y: winY,
    minWidth: 800,
    minHeight: 600,
    fullscreen: false,
    resizable: true,
    frame: false,
    show: false,
    autoHideMenuBar: true,
    icon: iconPath,
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  if (is.dev) mainWindow.webContents.openDevTools()

  mainWindow.on('ready-to-show', () => {
    mainWindow?.show()
  })

  const saveBounds = () => {
    if (!mainWindow || mainWindow.isMaximized() || mainWindow.isMinimized()) return
    const b = mainWindow.getBounds()
    if (b.width > 0 && b.height > 0) {
      const configPath = path.join(app.getPath('userData'), 'window-bounds.json')
      try { fs.writeFileSync(configPath, JSON.stringify(b)) } catch { /* */ }
    }
  }

  mainWindow.on('resize', saveBounds)
  mainWindow.on('move', saveBounds)

  mainWindow.on('close', (event) => {
    if (tray && !isQuitting) {
      event.preventDefault()
      mainWindow?.hide()
    }
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  registerAllIPC(mainWindow)

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'))
  }
}

function createTray() {
  const icon = nativeImage.createEmpty()
  tray = new Tray(icon.resize({ width: 16, height: 16 }))
  const isZh = app.getLocale().startsWith('zh')
  tray.setToolTip(isZh ? '素材工厂' : 'Heartstone')

  const contextMenu = Menu.buildFromTemplate([
    {
      label: isZh ? '显示窗口' : 'Show Window',
      click: () => {
        mainWindow?.show()
        mainWindow?.focus()
      }
    },
    { type: 'separator' },
    {
      label: isZh ? '退出' : 'Quit',
      click: () => {
        isQuitting = true
        app.quit()
      }
    }
  ])

  tray.setContextMenu(contextMenu)
  tray.on('double-click', () => {
    mainWindow?.show()
    mainWindow?.focus()
  })
}

ipcMain.handle('window-minimize', () => mainWindow?.minimize())
ipcMain.handle('window-maximize', () => {
  if (mainWindow?.isMaximized()) mainWindow.unmaximize()
  else mainWindow?.maximize()
})
ipcMain.handle('window-close', () => mainWindow?.close())
ipcMain.handle('window-isMaximized', () => mainWindow?.isMaximized() ?? false)

app.whenReady().then(async () => {
  electronApp.setAppUserModelId('com.heartstone')

  protocol.handle('media', async (request) => {
    try {
      const fp = decodeURIComponent(request.url.slice('media://'.length))
      const ext = path.extname(fp).toLowerCase()
      const mimeMap: Record<string, string> = {
        '.mp4': 'video/mp4', '.mov': 'video/quicktime', '.webm': 'video/webm',
        '.mkv': 'video/x-matroska', '.flv': 'video/x-flv', '.avi': 'video/x-msvideo',
        '.wmv': 'video/x-ms-wmv', '.m4v': 'video/mp4',
        '.mp3': 'audio/mpeg', '.wav': 'audio/wav', '.flac': 'audio/flac',
        '.ogg': 'audio/ogg', '.m4a': 'audio/mp4', '.aac': 'audio/aac',
      }
      const mime = mimeMap[ext] || 'application/octet-stream'
      const stat = await fs.promises.stat(fp)
      const size = stat.size

      let start = 0, end = size - 1
      const range = request.headers.get('range')
      if (range) {
        const m = range.match(/bytes=(\d+)-(\d*)/)
        if (m) { start = parseInt(m[1], 10); end = m[2] ? parseInt(m[2], 10) : size - 1 }
      }

      const buf = Buffer.alloc(end - start + 1)
      const fd = await fs.promises.open(fp, 'r')
      await fd.read(buf, 0, buf.length, start)
      await fd.close()

      const headers: Record<string, string> = {
        'Content-Type': mime,
        'Content-Length': String(buf.length),
        'Accept-Ranges': 'bytes',
      }
      const status = range ? 206 : 200
      if (range) headers['Content-Range'] = `bytes ${start}-${end}/${size}`
      return new Response(buf, { status, headers })
    } catch {
      return new Response('Not found', { status: 404 })
    }
  })

  if (process.platform === 'darwin') {
    const dockIcon = nativeImage.createFromPath(getIconPath())
    if (!dockIcon.isEmpty()) app.dock?.setIcon(dockIcon)
  }

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()
  createTray()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
    else mainWindow?.show()
  })
})

ipcMain.handle('saveWindowBounds', async (_event, bounds: { x: number; y: number; width: number; height: number }) => {
  const configPath = path.join(app.getPath('userData'), 'window-bounds.json')
  fs.writeFileSync(configPath, JSON.stringify(bounds))
})

ipcMain.handle('loadWindowBounds', async () => loadWindowBounds())

app.on('before-quit', () => {
  isQuitting = true
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
