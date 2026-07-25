const { contextBridge, ipcRenderer } = require('electron')
contextBridge.exposeInMainWorld('api',{
  getMsg:(callback)=>{
    ipcRenderer.send('msg')
    const {width,height} = callback()
  }
})