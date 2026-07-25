const { BrowserWindow, app, ipcMain } = require('electron')
const path = require('path')
const {createMenu} = require('./menu')
const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 300,
    height: 400,
    x: 1000,
    y: 600,
    alwaysOnTop: true,
    webPreferences: {
      preload: path.resolve(__dirname, 'preload.js'),
      // nodeIntegration:true
    },
  })
  mainWindow.webContents.openDevTools()
  mainWindow.loadFile(path.resolve(__dirname, 'index.html'))
  createMenu(mainWindow)
  mainWindow.webContents.send()
}
app.whenReady().then(() => {
  createWindow()
})
ipcMain.on('Hello', () => {
  console.log('Hello yes')
})
ipcMain.on('render_msg',()=>{
  console.log('Render msg access')
})
ipcMain.on('communicate',()=>{
  console.log('Communication ok');
})
ipcMain.on('preload directly send',()=>{
  console.log('directly send');
})

