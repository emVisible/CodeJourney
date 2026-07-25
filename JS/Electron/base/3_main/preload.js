const { ipcRenderer, contextBridge, Menu } = require('electron')
/**
 * 预加载脚本渲染进程共享variable
*/
contextBridge.exposeInMainWorld('api', {
  saveFile: () => {
    ipcRenderer.send('saveFile')
  },
  counter: (callback) => {
    ipcRenderer.on('counter', (event, value) => {
      callback(value)
    })
  },
  upload: async () => {
    return await ipcRenderer.invoke('upload')
  },
  changeTitle: (value) => {
    ipcRenderer.send('changeTitle', value)
  }
})

/**
 * preload can operate DOM in Browser
*/
window.addEventListener('DOMContentLoaded', () => {
  for (const app of ['chrome', 'node', 'electron']) {
    const el = document.querySelector(`#${app}`)
    el.innerHTML = `${app}:${process.versions[app]}`
  }
})

ipcRenderer.on('msg', (event, message) => {
  console.log('message', message)
})