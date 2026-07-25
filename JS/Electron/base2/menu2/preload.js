const { contextBridge, ipcRenderer } = require('electron')
contextBridge.exposeInMainWorld('api',{
  getMsg:(options)=>{
    ipcRenderer.send('msg',options)
  }
})