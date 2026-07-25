const { BrowserWindow, app } = require('electron')
const path = require('path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 300,
    height: 300,
    x: 1500,
    y: 300,
    alwaysOnTop: true
  })
  win.loadFile(path.resolve(__dirname, 'index.html'))
}

app.whenReady()
  .then(() => {
    if (process.platform == 'darwin') console.log('apple')
    else if (process.platform == 'win32') console.log('windows')
    createWindow()
  })