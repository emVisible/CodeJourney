const { app, ipcMain, BrowserWindow, screen } = require('electron')
const { createWindow } = require('./window')

app.whenReady()
  .then(() => {
    createWindow()
  })

ipcMain.on('test', (event, value) => {
  console.log('value', value)
})

ipcMain.on('changeSize', (event, size) => {
  const win = BrowserWindow.fromWebContents(event.sender)
  const broserWindow = screen.getPrimaryDisplay().workAreaSize

  const { width, height } = size
  const broserWidth = broserWindow.width
  const broserHeight = broserWindow.height
  win.setBounds({ width, height, x: broserWidth / 2 - width / 2, y: broserHeight / 2 - height / 2 })
})