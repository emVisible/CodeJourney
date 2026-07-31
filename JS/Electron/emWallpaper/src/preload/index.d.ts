import { ElectronAPI } from '@electron-toolkit/preload'

interface ScanResult {
  files: Array<{
    name: string
    path: string
    size: number
    ext: string
    mtime: number
    thumbPath?: string
  }>
  error?: string
}

interface FileInfo {
  size: number
  ext: string
  codec?: string
  width?: number
  height?: number
  duration?: number
}

interface DownloadProgress {
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

interface DownloadTaskResult {
  taskId: string
  filename: string
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      quit(): void
      download(urls: string[], savePath: string, project: string): Promise<DownloadTaskResult[]>
      cancelDownload(taskId: string): Promise<void>
      checkSavePath(): Promise<string | undefined>
      onDownloadProgress(callback: (progress: DownloadProgress) => void): () => void
      scanDirectory(dirPath: string): Promise<ScanResult>
      openItemInFolder(filePath: string): Promise<void>
      getFileInfo(filePath: string): Promise<FileInfo>
      deleteFile(filePath: string): Promise<{ success: boolean; error?: string }>
      getDesktopPath(): Promise<string>
      directDownload(url: string, filePath: string, provider?: string): Promise<{ success: boolean; filePath?: string; error?: string }>
      minimize(): void
      maximize(): void
      closeWindow(): void
      isMaximized(): Promise<boolean>
      readLocalFile(filePath: string): Promise<{ data: string; mime: string; error?: string }>
      scanUrl(url: string): Promise<{ assets: Array<{ url: string; name: string; type: string }>; count?: number; error?: string }>
      extractVideo(url: string): Promise<{
        title?: string; duration?: number; thumbnail?: string; uploader?: string
        formats: Array<{ url: string; name: string; type: string; format: string; ext: string; size: number; resolution: string }>
        error?: string
      }>
      bilibiliInfo(input: string): Promise<{
        title?: string; cover?: string; uploader?: string; duration?: number; bvid?: string
        parts: Array<{ title: string; cid: number; duration: number; formats: Array<{ url: string; name: string; type: string; format: string; ext: string; size: number; hasVideo?: boolean; hasAudio?: boolean }>; error?: string }>
        error?: string
      }>
      bilibiliDownload(url: string, formatId: string, bestAudioId: string, outputDir: string, baseName: string): Promise<{ success: boolean; outputPath?: string; filename?: string; error?: string; log?: string[] }>
      getAssetMeta(filePath: string): Promise<any>
      extractVideoFrame(filePath: string): Promise<string | null>
      saveWindowBounds(bounds: { x: number; y: number; width: number; height: number }): Promise<void>
      loadWindowBounds(): Promise<{ x: number; y: number; width: number; height: number } | null>
      startClipboardMonitor(): void
      stopClipboardMonitor(): void
      setClipboardConfig(cfg: { enabled: boolean; bilibili: boolean; youtube: boolean }): void
      clearClipboardLast(): void
      onClipboardParse(callback: (data: { url: string; type: string }) => void): () => void
    }
  }
}
