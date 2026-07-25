const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld('api', {
  toRender(callback) {
    ipcRenderer.on('toRender', (event, value) => {
      callback(value)
    })
  },
  toMain(callback) {
    ipcRenderer.send('toMain')
  }
})


ipcRenderer.on('toRender', () => {
  console.log("向预加载脚本发送完毕")
})
window.addEventListener('contextmenu', ()=>{
  console.log('33')
  ipcRenderer.send('rightClick')
  ipcRenderer.send('mainPopMenu')
})