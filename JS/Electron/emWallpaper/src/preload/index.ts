import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

export interface DownloadProgress {
  taskId: string
  phase: string
  percent?: number
  downloaded?: number
  total?: number
  chunks?: number
  speed?: number
  chunkIndex?: number
  loaded?: number
  filePath?: string
  filename?: string
  error?: string
}

export interface DownloadTaskResult {
  taskId: string
  filename: string
}

const api = {
  quit() {
    ipcRenderer.send('quitApp')
  },

  async download(urls: string[], savePath: string, project: string): Promise<DownloadTaskResult[]> {
    return await ipcRenderer.invoke('download', urls, savePath, project)
  },

  async cancelDownload(taskId: string) {
    return await ipcRenderer.invoke('cancelDownload', taskId)
  },

  async checkSavePath(): Promise<string | undefined> {
    return await ipcRenderer.invoke('checkSavePath')
  },

  onDownloadProgress(callback: (progress: DownloadProgress) => void) {
    const handler = (_event: Electron.IpcRendererEvent, data: DownloadProgress) => {
      callback(data)
    }
    ipcRenderer.on('download-progress', handler)
    return () => {
      ipcRenderer.removeListener('download-progress', handler)
    }
  },

  async scanDirectory(dirPath: string) {
    return await ipcRenderer.invoke('scanDirectory', dirPath)
  },

  async openItemInFolder(filePath: string) {
    return await ipcRenderer.invoke('openItemInFolder', filePath)
  },

  async getFileInfo(filePath: string) {
    return await ipcRenderer.invoke('getFileInfo', filePath)
  },

  async deleteFile(filePath: string) {
    return await ipcRenderer.invoke('deleteFile', filePath)
  },

  async getDesktopPath(): Promise<string> {
    return await ipcRenderer.invoke('getDesktopPath')
  },

  async directDownload(url: string, filePath: string, provider?: string) {
    return await ipcRenderer.invoke('directDownload', url, filePath, provider)
  },

  minimize() { ipcRenderer.invoke('window-minimize') },
  maximize() { ipcRenderer.invoke('window-maximize') },
  closeWindow() { ipcRenderer.invoke('window-close') },
  async isMaximized() { return await ipcRenderer.invoke('window-isMaximized') },

  async readLocalFile(filePath: string) {
    return await ipcRenderer.invoke('readLocalFile', filePath)
  },

  async scanUrl(url: string) {
    return await ipcRenderer.invoke('scanUrl', url)
  },

  async extractVideo(url: string) {
    return await ipcRenderer.invoke('extractVideo', url)
  },

  async bilibiliInfo(input: string) {
    return await ipcRenderer.invoke('bilibiliInfo', input)
  },

  async bilibiliDownload(url: string, formatId: string, bestAudioId: string, outputDir: string, baseName: string) {
    return await ipcRenderer.invoke('bilibiliDownload', url, formatId, bestAudioId, outputDir, baseName)
  },

  async getAssetMeta(filePath: string) {
    return await ipcRenderer.invoke('getAssetMeta', filePath)
  },

  async extractVideoFrame(filePath: string): Promise<string | null> {
    return await ipcRenderer.invoke('extractVideoFrame', filePath)
  },

  async saveWindowBounds(bounds: { x: number; y: number; width: number; height: number }) {
    return await ipcRenderer.invoke('saveWindowBounds', bounds)
  },

  async loadWindowBounds() {
    return await ipcRenderer.invoke('loadWindowBounds')
  },

  startClipboardMonitor() {
    ipcRenderer.invoke('clipboard:start')
  },

  stopClipboardMonitor() {
    ipcRenderer.invoke('clipboard:stop')
  },

  setClipboardConfig(cfg: { enabled: boolean; bilibili: boolean; youtube: boolean }) {
    ipcRenderer.invoke('clipboard:config', cfg)
  },

  clearClipboardLast() {
    ipcRenderer.invoke('clipboard:clearLast')
  },

  onClipboardParse(callback: (data: { url: string; type: string }) => void) {
    const handler = (_event: Electron.IpcRendererEvent, data: { url: string; type: string }) => callback(data)
    ipcRenderer.on('clipboard-parse', handler)
    return () => { ipcRenderer.removeListener('clipboard-parse', handler) }
  }
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore
  window.electron = electronAPI
  // @ts-ignore
  window.api = api
}
