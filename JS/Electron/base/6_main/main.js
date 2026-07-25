const { app, ipcMain, dialog } = require('electron')
const { createWindow } = require('./window')
const fs = require('fs')
require('./menu')

app.whenReady()
  .then(() => {
    const currentWindow = createWindow()
  })

ipcMain.handle('selectFile', async () => {
  const { filePaths } = await dialog.showOpenDialog({
    title: "选择图片",
    properties: ['openFile', 'multiSelections'],
    filters: [{
      name: 'image',
      extensions: ['jpg', 'png']
    }],
  })
  console.log('filePaths', filePaths)
  return filePaths
})

ipcMain.on('saveFile', async (event, value) => {
  const res = await dialog.showSaveDialog({
    title: "保存文件",
  })
  fs.writeFileSync(res.filePath, value)
})