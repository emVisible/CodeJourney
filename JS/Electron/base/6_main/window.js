const { BrowserWindow, shell } = require('electron')
const path = require('path')
const createWindow = () => {
  const win = new BrowserWindow({
    width: 500,
    height: 800,
    x: 1200,
    y: 300,
    alwaysOnTop: true,
    webPreferences: {
      preload: path.resolve(__dirname, "preload.js")
    },
  })
  win.loadFile(path.resolve(__dirname, "index.html"))
  win.webContents.openDevTools()
  win.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })
  return win
}

module.exports = {
  createWindow
}