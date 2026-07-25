const { ipcRenderer, contextBridge } = require('electron')
contextBridge.exposeInMainWorld('access',{
  func(callback){
    ipcRenderer.send('access',10)
    callback()
  }
})


ipcRenderer.on('access_menu',(arg,value)=>{
  console.log("access_menu plus ok");
})

ipcRenderer.on('server_back_msg',(arg,value)=>{
  console.log(value);
})