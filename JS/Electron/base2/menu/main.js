const {createWindow,} = require('./window')
const {app} = require('electron')

app.whenReady().then(()=>{
  createWindow()
})