const { BrowserWindow, app } = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 300,
    height: 300,
    alwaysOnTop: true,
    x: 1000
  })
  win.loadURL("http://127.0.0.1:5173/")
}
app.whenReady()
  .then(() => {
    createWindow()
})