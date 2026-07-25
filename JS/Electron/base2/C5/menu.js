const { app, Menu, shell } = require('electron')
const isMac = process.platform == 'darwin'
const config = [
  isMac
    ? ...[
        {
          label: app.name,
          submenu: [{ label: '访问网站', click: () => {
            shell.openExternal("https://www.houdunren.com")
          } }],
        },
      ]
    : ...[],
]

Menu.setApplicationMenu(null)
