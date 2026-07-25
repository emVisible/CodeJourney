const { app, ipcMain } = require('electron')
const { createWindow } = require('./window')
const { createMenu } = require('./menu')
require('./contextMenu')

app.whenReady()
  .then(() => {
    const win = createWindow()
    createMenu(win)
  })

ipcMain.on('toMain', ()=>{
  console.log("yes")
})

ipcMain.on('rightClick', ()=>{
  console.log('rightClick')
})