const { Menu, app, shell } = require('electron')
const isMac = process.platform == 'darwin'

const createMenu = (win) => {
  console.log('win', win)
  const config = [
    ... (isMac ?
      [
        {
          label: app.name,
          submenu: [
            {
              label: '访问',
              click() {
                shell.openExternal("https://www.bilibili.com")
              }
            }
          ]
        },
      ] :
      [
        {
          label: "访问",
          submenu: [
            {
              label: "menu 1",
              click() {
                shell.openExternal("https://bilibili.com")
              },
              accelerator: 'CommandOrControl+A'
            },
            {
              label: "向预加载脚本发送",
              click() {
                win.webContents.send('toRender')
              },
            },
            {
              type: "separator"
            },
            {
              role: isMac ? "close" : "quit",
            }
          ]
        }
      ]
    )
  ]

  Menu.setApplicationMenu(Menu.buildFromTemplate(config))
}

module.exports = {
  createMenu
}