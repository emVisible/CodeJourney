const { Menu } = require('electron')

const createMenu = (win) => {
  const menu = [
    {
      label: '菜单',
      submenu: [
        {
          label: '增加',
          click: () => {
            win.webContents.send('access_menu',1)
          },
        },
      ],
    },
  ]

  Menu.setApplicationMenu(Menu.buildFromTemplate(menu))
}

module.exports = {
  createMenu,
}
