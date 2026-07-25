const { ipcRenderer, Menu } = require("electron")

const createMenu = (win) => {
  const menu = [
    {
      label: 'Menu',
      submenu: [
        {
          label: 'add',
          click: () => {
            win.webContents.send('counter', 1)
          }
        }
      ]
    }
  ]
  Menu.setApplicationMenu(Menu.buildFromTemplate(menu))
}
module.exports = {
  createMenu
}