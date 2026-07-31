export interface ScanResult {
  files: Array<{
    name: string
    path: string
    size: number
    ext: string
    mtime: number
  }>
  error?: string
}

export interface FileInfo {
  size: number
  ext: string
  codec?: string
  width?: number
  height?: number
  duration?: number
}

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

export type { DownloadTask, DownloadStatus } from '@renderer/store/download'
export type { Project, ThemeMode } from '@renderer/store/config'
