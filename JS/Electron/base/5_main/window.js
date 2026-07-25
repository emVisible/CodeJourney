const { BrowserWindow } = require('electron')
const path = require('path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 600,
    height: 900,
    x: 1200,
    y: 300,
    alwaysOnTop: true,
    webPreferences: {
      preload: path.resolve(__dirname, 'preload.js')
    }
  })
  win.loadFile(path.resolve(__dirname, 'index.html'))
  win.webContents.openDevTools()
  return win
}

module.exports = {
  createWindow
}