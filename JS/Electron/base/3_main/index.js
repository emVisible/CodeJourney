const { BrowserWindow, app, ipcMain, dialog } = require('electron')
const path = require('path')
const { createMenu } = require('./menu')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 400,
    x: 1200,
    y: 300,
    alwaysOnTop: true,
    webPreferences: {
      preload: path.resolve(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  })
  win.loadFile(path.resolve(__dirname, "index.html"))
  win.webContents.openDevTools()
  createMenu(win)
}


app.whenReady()
  .then(() => {
    createWindow()
  })
ipcMain.on('saveFile', (event) => {
  console.log('saveFile')
})


ipcMain.on('counter', (event) => {
  BrowserWindow.fromWebContents(event.sender).send('msg', "收到通知")
  console.log('counter')
})

/**
 * 处理渲染进程向
*/
ipcMain.handle('upload', async () => {
  const { filePaths } = await dialog.showOpenDialog({})
  console.log('filePaths', filePaths)
  return filePaths
})
ipcMain.on('changeTitle', (event, value)=>{
  BrowserWindow.fromWebContents(event.sender).title = value
})