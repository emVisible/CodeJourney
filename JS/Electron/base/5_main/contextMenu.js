const { app, Menu, BrowserWindow, ipcMain, shell } = require('electron')

ipcMain.on('mainPopMenu', (event) => {
  const config = [
    {
      label: '退出',
      click() {
        app.quit()
      }
    },
    {
      label: '打开官网',
      click(){
        shell.openExternal("https://bilibili.com")
      }
    }
  ]
  const menu = Menu.buildFromTemplate(config)
  menu.popup(BrowserWindow.fromWebContents(event.sender))
})