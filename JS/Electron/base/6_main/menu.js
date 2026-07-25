const { Menu, app, dialog } = require('electron')
const config = [
  {
    label: app.name,
    submenu: [
      {
        label: '访问官网',
        click() {
          console.log('history')
        }
      },
      {
        label: "退出",
        async click() {
          const res = await dialog.showMessageBox({
            title: app.name,
            detail: "确认要退出嘛",
            buttons: ['取消', '确定']
          })
          console.log('res', res)
          if (res.response == 1) {
            app.quit()
          }
        }
      },
      {
        label: "获取神秘力量",
        async click() {
          const res = await dialog.showMessageBox({
            title: "神秘力量！",
            detail: "你渴望力量吗?",
            buttons: ["取消", "确定"],
            checkboxLabel: "(真的想)",
          })
          res.checkboxChecked ? dialog.showErrorBox("You Got", "Haha") : ""
          res.response == 1 ? app.quit() : ""
        }
      }
    ]
  }
]

const template = Menu.buildFromTemplate(config)
Menu.setApplicationMenu(template)