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
  // mainWindow.webContents.send()
}
app.whenReady().then(() => {
  createWindow()
})

ipcMain.on('access',(event,value)=>{
  console.log("number plus ok")
  console.log(value)
  BrowserWindow.fromWebContents(event.sender).send('server_back_msg','已收到数据')
})

ipcMain.on('access_menu',()=>{
  console.log('access_menu plus ok')
})



                console.log("Hello World!")