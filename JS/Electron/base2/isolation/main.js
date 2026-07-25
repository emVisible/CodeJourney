const { app, ipcMain, BrowserWindow, screen } = require('electron')
const { createWindow } = require('./window')
app.whenReady().then(() => {
  createWindow()
})

ipcMain.on('setWindowPosition', (event, options) => {
  const win = BrowserWindow.fromWebContents(event.sender)
  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  const x = width / 2 - options.width / 2
  const y = height / 2 - options.height / 2
  win.setBounds({ ...options, x, y }, true)
})
