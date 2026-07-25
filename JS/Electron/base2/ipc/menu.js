const { Menu } = require('electron')

const createMenu = (win) => {
  const menu = [
    {
      label: '菜单',
      submenu: [
        {
          label: '增加',
          click: () => {
            // win.webContents.send('demo')
            // win.webContents.send('render_send',1)
            window.param.func((value) => {
              const el = document.querySelector('#counter')
              el.innerHTML = Number(el.innerHTML) + value
            })
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
