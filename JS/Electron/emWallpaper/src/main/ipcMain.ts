import { registerAssetsIPC } from './ipc/assets'
import { registerDownloadIPC } from './ipc/download'
import { registerBilibiliIPC } from './ipc/bilibili'
import { registerProxyIPC } from './ipc/proxy'
import { registerClipboardIPC } from './ipc/clipboard'
import { BrowserWindow } from 'electron'

export function registerAllIPC(win: BrowserWindow) {
  registerAssetsIPC()
  registerDownloadIPC()
  registerBilibiliIPC()
  registerProxyIPC()
  registerClipboardIPC(win)
}
