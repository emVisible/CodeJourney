const { contextBridge, ipcRenderer } = require("electron");
// shell.openExternal('https://baidu.com')
// const fs = require('fs')

/**
 * 标准进程通讯
*/
contextBridge.exposeInMainWorld('api', {
  test() {
    const sendValue = "This is the test"
    ipcRenderer.send('test', sendValue)
  },
  submit(size){
    console.log('size',size)
    ipcRenderer.send('changeSize', size)
  }
})

/**
 * 取消进程隔离
*/
// window.api = {
//   test() {
//     const sendValue = "This is the test"
//     ipcRenderer.send('test', sendValue)
//   }
// }
// fs.writeFileSync('r.txt', "hi")