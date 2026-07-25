const {BrowserWindow, app} = require('electron')
const path = require('path')
const createWindow = ()=>{
  const mainWindow = new BrowserWindow({
    alwaysOnTop:true,
    width:799,
    height:500,
    x:1000,
    y:300,
    webPreferences: {
      preload: path.resolve(__dirname, 'preload.js'),
      // nodeIntegration:true
    },
  })
  mainWindow.webContents.openDevTools()
  mainWindow.loadFile(path.resolve(__dirname,"index.html"))
}
app.whenReady().then(()=>{
  createWindow()
})