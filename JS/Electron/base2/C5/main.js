const { app, BrowserWindow } = require('electron')
const { createWindow } = require('./window')
require('./menu')

app.whenReady().then(() => {
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform != 'darwin') app.quit()
})

app.on('activate', () => {
  if (
    BrowserWindow.getAllWindows().length == 0 &&
    process.platform == 'darwin'
  ) {
    createWindow()
  }
})
