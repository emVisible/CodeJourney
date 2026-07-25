const { createWindow } = require('./window')
const { app, BrowserWindow, ipcMain, screen } = require('electron')
require('./menu')

app.whenReady().then(() => {
  createWindow()
})
// 设置苹果系统退出
app.on('window-all-closed',()=>{
  if (process.platform != 'darwin'){
    app.quit()
  }
})
app.on('activate',()=>{
  if(process.platform == 'darwin' && BrowserWindow.getAllWindows().length == 0) {
    createWindow()
  }
})
ipcMain.on('msg', (event, options) => {
  const win = BrowserWindow.fromWebContents(event.sender)
  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  const x = width / 2 - options.width / 2
  const y = height / 2 - options.height / 2
  win.setBounds({ ...options, x, y }, true)
})
