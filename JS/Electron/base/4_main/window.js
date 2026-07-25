const { BrowserWindow, screen } = require("electron")
const path = require('path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 500,
    height: 400,
    x: 1200,
    y: 300,
    alwaysOnTop: true,
    webPreferences: {
      preload: path.resolve(__dirname, 'preload.js'),
      // contextIsolation: false,
      // nodeIntegration: true
      // sandbox:false
    }
  })
  win.loadFile(path.resolve(__dirname, 'index.html'))
  // setTimeout(() => {
  //   const { height, width } = screen.getPrimaryDisplay().workAreaSize
  //   const windowWidth = win.getSize()[0]
  //   const windowHeight = win.getSize()[1]
  //   const x = width / 2 - windowWidth / 2
  //   const y = height / 2 - windowHeight / 2
  //   win.setBounds({ x, y })
  //   // win.setBounds({ width: 1080, height: 900, x: 0, y: 0 }, true)
  // }, 1000);
}

module.exports = {
  createWindow
}