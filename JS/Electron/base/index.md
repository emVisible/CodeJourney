# 1_base

- electron配置

  ```
  "main": "index.js",
  scritps:{
  	"dev":"nodemon --exec electron .",
  }
  ```

- nodemon操作

  ```
  {
    "ignore": ["node_modules", "dist"],
    "colrous": true,
    "verbose": true,
    "restartable": "rs",
    "watch": ["*.*"],
    "ext": "html, js, css"
  }
  ```

- 主进程与渲染进程

# 2_base

- concurrently

  ```
  "dev": "concurrently \"vite\" \"nodemon --exec electron .\"",
  ```

- vue结合配置

  ```
  "main": "electron/main.cjs",
  ```

# 2_base2

- microsoft electron调试配置
- 调试快捷键

# 3_main

- 预加载脚本定义

- 预加载脚本和主进程 && 渲染进程的关系

- 流程

  ```
  主进程监听 => 预加载脚本桥接 && 发送 => 渲染进程调用 
  ```

  

- 主进程-预加载脚本

  ```
  ipcMain.on 监听
  
  ipcRender.send 发送 
  webContents.send 
  ```

- 预加载脚本-渲染进程

  ```
  contextBridge
  ```

  ---
  
- 双向通信

  主=>渲染

  BrowserWindow.fromWebContents(event.sender).send()

  渲染=>主

  ipcMain.handle / ipcRender.invoke / 直接return

---

# 4_main

- 取消渲染进程和预加载脚本的隔离

- 取消node限制

- 关闭沙盒模式

- 打开外部对话 shell.openExternal

- 自动居中

  ```
  
      const { height, width } = screen.getPrimaryDisplay().workAreaSize
      const windowWidth = win.getSize()[0]
      const windowHeight = win.getSize()[1]
      const x = width / 2 - windowWidth / 2
      const y = height / 2 - windowHeight / 2
      win.setBounds({ x, y })
  ```

- 动态窗口调整

# 5_main

- 菜单栏

  ```
  Menu.setApplicationMenu(Menu.buildFromTemplate(config))
  ```

  

- 右键栏

  ```
  menu.popup()
  ```

- 强化进程通讯

  ```
  ipcMain定位
  BroswerWindow.fromWebContents(event.sender) 定位
  ```

# 6_main

- dialog async click
  - error dialog
  - save dialog
  - message dialog
- setWindowOpenHandler
- 文件写入
- Menu

# 7_camera

- 巩固知识
