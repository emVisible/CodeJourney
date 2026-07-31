import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type DownloadStatus =
  | 'pending'
  | 'starting'
  | 'downloading'
  | 'assembling'
  | 'complete'
  | 'error'
  | 'cancelled'

export interface DownloadTask {
  id: string
  url: string
  filename: string
  project: string
  status: DownloadStatus
  progress: number
  downloaded: number
  total: number
  speed: number
  error?: string
  filePath?: string
  createdAt: number
}

export interface DownloadState {
  tasks: DownloadTask[]
}

const initialState: DownloadState = {
  tasks: []
}

export const downloadSlice = createSlice({
  name: 'download',
  initialState,
  reducers: {
    hydrateTasks(state, action: PayloadAction<DownloadTask[]>) {
      state.tasks = action.payload
    },

    addTask(
      state,
      action: PayloadAction<{
        id: string
        url: string
        filename: string
        project: string
      }>
    ) {
      state.tasks.unshift({
        ...action.payload,
        status: 'pending',
        progress: 0,
        downloaded: 0,
        total: 0,
        speed: 0,
        createdAt: Date.now()
      })
    },

    addBatchTasks(
      state,
      action: PayloadAction<
        Array<{ id: string; url: string; filename: string; project: string }>
      >
    ) {
      const now = Date.now()
      for (const t of action.payload.reverse()) {
        state.tasks.unshift({
          ...t,
          status: 'pending',
          progress: 0,
          downloaded: 0,
          total: 0,
          speed: 0,
          createdAt: now
        })
      }
    },

    updateProgress(
      state,
      action: PayloadAction<{
        taskId: string
        phase: string
        total?: number
        chunks?: number
        downloaded?: number
        speed?: number
        percent?: number
        filePath?: string
        filename?: string
        error?: string
      }>
    ) {
      const task = state.tasks.find((t) => t.id === action.payload.taskId)
      if (!task) return
      const p = action.payload

      switch (p.phase) {
        case 'starting':
          task.status = 'starting'
          task.total = p.total ?? task.total
          break
        case 'downloading':
          task.status = 'downloading'
          if (p.downloaded !== undefined) task.downloaded = p.downloaded
          if (p.speed !== undefined) task.speed = p.speed
          if (p.total) task.total = p.total
          if (task.total > 0 && task.downloaded > 0) {
            task.progress = Math.min(Math.round((task.downloaded / task.total) * 100), 100)
          }
          break
        case 'assembling':
          task.status = 'assembling'
          task.progress = 100
          if (p.downloaded !== undefined) task.downloaded = p.downloaded
          break
        case 'complete':
          task.status = 'complete'
          task.progress = 100
          task.downloaded = p.total ?? task.downloaded
          task.filePath = p.filePath
          task.speed = 0
          if (p.filename) task.filename = p.filename
          break
        case 'error':
          task.status = 'error'
          task.error = p.error
          task.speed = 0
          break
      }
    },

    retryTask(state, action: PayloadAction<string>) {
      const task = state.tasks.find((t) => t.id === action.payload)
      if (task && (task.status === 'error' || task.status === 'cancelled')) {
        task.status = 'pending'
        task.progress = 0
        task.downloaded = 0
        task.speed = 0
        task.error = undefined
      }
    },

    cancelTask(state, action: PayloadAction<string>) {
      const task = state.tasks.find((t) => t.id === action.payload)
      if (
        task &&
        task.status !== 'complete' &&
        task.status !== 'error' &&
        task.status !== 'cancelled'
      ) {
        task.status = 'cancelled'
      }
    },

    removeTask(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload)
    },

    clearCompleted(state) {
      state.tasks = state.tasks.filter(
        (t) => t.status !== 'complete' && t.status !== 'error' && t.status !== 'cancelled'
      )
    }
  }
})

export const {
  hydrateTasks,
  addTask,
  addBatchTasks,
  updateProgress,
  retryTask,
  cancelTask,
  removeTask,
  clearCompleted
} = downloadSlice.actions
export default downloadSlice.reducer
