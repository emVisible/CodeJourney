
const {contextBridge} = require('electron')
contextBridge.exposeInMainWorld('send',{
  msg(){
    console.log('send to main');
  }
})
