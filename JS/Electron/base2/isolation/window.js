const {BrowserWindow} = require('electron')
const path = require('path')
const createWindow = ()=>{
  const mainWindow = new BrowserWindow({
    width:500,
    height:500,
    x:300,
    y:300,
    alwaysOnTop:true,
    webPreferences:{
      preload:path.resolve(__dirname,'preload.js')
    },
  })
  mainWindow.webContents.openDevTools()
  mainWindow.loadFile(path.resolve(__dirname,'index.html'))
}
module.exports = {
  createWindow
}