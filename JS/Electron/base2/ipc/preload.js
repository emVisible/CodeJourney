// const fs = require('fs')
// const content = fs.readFileSync('package.json','utf-8')
// console.log(content)
const { ipcRenderer, contextBridge } = require('electron')
ipcRenderer.send('Hello')
console.log("young 's forever")

contextBridge.exposeInMainWorld('variable_name', {
  a: 300,
})

contextBridge.exposeInMainWorld('sendToMain', {
  send() {
    ipcRenderer.send('render_msg')
  },
})

window.addEventListener('DOMContentLoaded', () => {
  for (const app of ['node', 'chrome', 'electron']) {
    const el = document.querySelector(`#${app}`)
    el.innerHTML = `${app}:${process.versions[app]}`
  }
})

ipcRenderer.on('demo',()=>{
  document.querySelector('#counter').innerHTML += 1
})
ipcRenderer.send('preload directly send')
contextBridge.exposeInMainWorld('api',{
  communicate(){
    ipcRenderer.send('communicate')
  }
})

ipcRenderer.on('render_send',(arg,value)=>{
  console.log(value);
})


contextBridge.exposeInMainWorld('param',{
  func:(callback)=>{
    ipcRenderer.on('test',(event,value)=>{
    allback(value)
  })
  }
})