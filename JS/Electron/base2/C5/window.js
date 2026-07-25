const { BrowserWindow } = require('electron')
const path = require('path')
const createWindow = () => {
  const win = new BrowserWindow({
    width: 300,
    height: 300,
    alwaysOnTop: true,
    x: 1500,
    y: 100,
  })
  win.webContents.openDevTools()
  win.loadFile(path.resolve(__dirname, 'index.html'))
}

module.exports = {
  createWindow,
}
