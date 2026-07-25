const { create } = require('domain')
const { BrowserWindow, app } = require('electron')
const path = require('path')

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 500,
    height: 500,
    alwaysOnTop: true,
    x: 1500,
    y: 300,
    frame: false,
    transparent:true
  })
  mainWindow.loadURL(path.resolve(__dirname, "index.html"))
  mainWindow.setAspectRatio(1)

}

app.whenReady()
  .then(() => {
    createWindow()

    app.on('window-all-closed', () => {
      if (process.platform != 'darwin') {
        app.quit()
        console.log('right')
      }
    })
    app.on('activate', () => {
      createWindow()
    })

  })


