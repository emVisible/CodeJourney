const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
  async selectFile() {
    return await ipcRenderer.invoke('selectFile')
  },
  async saveFile(value){
    ipcRenderer.send('saveFile', value)
  }
})
