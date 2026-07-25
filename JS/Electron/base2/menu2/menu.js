const { app, Menu, shell } = require("electron")

const isMac = process.platform == 'darwin'
const config = [
  ...(isMac ? [{
    label:app.name,
    submenu:[
      {label:'web',
        click:()=>{
          shell.openExternal('http://124.220.174.184/')
        }},
      {},
      {}
    ]
  }] : [])
]

Menu.setApplicationMenu(Menu.buildFromTemplate(config))