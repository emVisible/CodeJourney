const path = require('path')
const {BrowserWindow} = require('electron')

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    alwaysOnTop: true,
    width: 300,
    height: 300,
    x: 900,
    y: 500,
    webPreferences: {
      preload: path.resolve(__dirname, 'preload.js'),
    },
  })
  mainWindow.loadFile(path.resolve(__dirname, 'index.html'))
}

module.exports = {
  createWindow
}
