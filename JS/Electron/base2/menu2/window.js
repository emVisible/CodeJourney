const path = require('path')
const {BrowserWindow} = require('electron')

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    alwaysOnTop: true,
    width: 700,
    height: 300,
    x: 1200,
    y: 200,
    webPreferences: {
      preload: path.resolve(__dirname, 'preload.js'),
    },
  })
  mainWindow.webContents.openDevTools()
  mainWindow.loadFile(path.resolve(__dirname, 'index.html'))
}

module.exports = {
  createWindow
}
