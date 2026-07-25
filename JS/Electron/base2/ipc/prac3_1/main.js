const {BrowserWindow, app, ipcMain, dialog} = require('electron')
const createWindow = ()=>{
 const win =  new BrowserWindow({
    width:300,
    height:300,
    alwaysOnTop:true,
    // transparent:true
  })
  win.loadFile(path.resolve(__dirname, 'index.html'))
  win.loadURL("http://localhost:5173/")
}

app.whenReady().then(()=>{
  createWindow()
})
ipcMain.handle('select_file',async ()=>{
  const el = await dialog.showOpenDialog({})
  return el
  console.log(el);
})
