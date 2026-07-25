const { ipcRenderer, contextBridge } = require('electron')
contextBridge.exposeInMainWorld('api',{
  upload:async()=>{
    const file = await ipcRenderer.invoke('select_file')
    console.log(file);
  }
})