import { BrowserWindow } from 'electron'

const getWin = (win: Electron.IpcMainEvent | Electron.IpcMainInvokeEvent) => {
  return BrowserWindow.fromWebContents(win.sender)
}

export { getWin }
