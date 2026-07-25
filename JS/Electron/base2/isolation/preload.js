const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
  changeWindowPosition: (options) => {
    ipcRenderer.send('setWindowPosition',options)
  },
})
