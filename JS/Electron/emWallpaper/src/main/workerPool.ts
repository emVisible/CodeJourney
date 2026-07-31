import { Worker } from 'worker_threads'
import fs from 'fs'
import path from 'path'
import { app } from 'electron'

interface ChunkJob {
  url: string
  start: number
  end: number
  index: number
  taskId: string
  headers?: Record<string, string>
}

interface QueuedJob {
  job: ChunkJob
  resolve: (data: ArrayBuffer) => void
  reject: (err: Error) => void
  retries: number
}

function getWorkerPath(): string {
  if (app.isPackaged) {
    return path.join(process.resourcesPath, 'worker.js')
  }
  const candidates = [
    path.join(app.getAppPath(), 'src', 'main', 'worker.js'),
    path.join(__dirname, 'worker.js')
  ]
  for (const p of candidates) {
    if (fs.existsSync(p)) return p
  }
  throw new Error(`Worker not found: ${candidates.join(', ')}`)
}

type ProgressCallback = (taskId: string, data: {
  chunkIndex: number
  loaded: number
  total: number
  speed: number
}) => void

export class WorkerPool {
  private maxWorkers: number
  private running = 0
  private queue: QueuedJob[] = []
  private taskWorkers = new Map<string, Set<Worker>>()
  private taskChunkProgress = new Map<string, Map<number, number>>()
  private taskChunkTotals = new Map<string, Map<number, number>>()
  private taskStartTimes = new Map<string, number>()
  private taskTotalDownloaded = new Map<string, number>()
  private taskTotalSize = new Map<string, number>()
  private onProgress: ProgressCallback | null = null
  private maxRetries = 3

  constructor(maxWorkers = 8) {
    this.maxWorkers = maxWorkers
  }

  setProgressCallback(cb: ProgressCallback) {
    this.onProgress = cb
  }

  registerTask(taskId: string, totalSize: number) {
    this.taskChunkProgress.set(taskId, new Map())
    this.taskChunkTotals.set(taskId, new Map())
    this.taskStartTimes.set(taskId, Date.now())
    this.taskTotalDownloaded.set(taskId, 0)
    this.taskTotalSize.set(taskId, totalSize)
    this.taskWorkers.set(taskId, new Set())
  }

  downloadChunk(job: ChunkJob): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
      this.queue.push({ job, resolve, reject, retries: 0 })
      this.processQueue()
    })
  }

  cancelTask(taskId: string) {
    const workers = this.taskWorkers.get(taskId)
    if (workers) {
      for (const w of workers) {
        try { w.terminate() } catch { /* gone */ }
      }
      workers.clear()
    }
    this.queue = this.queue.filter((q) => q.job.taskId !== taskId)
    this.cleanupTask(taskId)
  }

  private cleanupTask(taskId: string) {
    this.taskChunkProgress.delete(taskId)
    this.taskChunkTotals.delete(taskId)
    this.taskStartTimes.delete(taskId)
    this.taskTotalDownloaded.delete(taskId)
    this.taskTotalSize.delete(taskId)
    this.taskWorkers.delete(taskId)
  }

  private processQueue() {
    while (this.running < this.maxWorkers && this.queue.length > 0) {
      const item = this.queue.shift()!
      this.running++
      this.executeChunk(item)
    }
  }

  private executeChunk(item: QueuedJob) {
    const { job } = item
    const worker = new Worker(getWorkerPath(), {
      workerData: { url: job.url, start: job.start, end: job.end, index: job.index, taskId: job.taskId, headers: job.headers || {} }
    })

    const workers = this.taskWorkers.get(job.taskId)
    if (workers) workers.add(worker)

    let lastProgressTime = Date.now()
    let lastProgressBytes = 0

    worker.on('message', (msg) => {
      if (msg.type === 'progress') {
        const now = Date.now()
        const timeDelta = Math.max(now - lastProgressTime, 100)
        const bytesDelta = msg.loaded - lastProgressBytes
        const speed = bytesDelta / (timeDelta / 1000)
        lastProgressTime = now
        lastProgressBytes = msg.loaded

        if (this.onProgress) {
          this.onProgress(msg.taskId, {
            chunkIndex: msg.index,
            loaded: msg.loaded,
            total: msg.total,
            speed
          })
        }
      } else if (msg.type === 'chunk') {
        this.running--
        worker.terminate()
        const ws = this.taskWorkers.get(job.taskId)
        if (ws) ws.delete(worker)
        item.resolve(Buffer.from(msg.data))
        this.processQueue()
      } else if (msg.type === 'error') {
        if (item.retries < this.maxRetries) {
          item.retries++
          this.running--
          worker.terminate()
          this.queue.unshift(item)
          this.processQueue()
        } else {
          this.running--
          worker.terminate()
          const ws = this.taskWorkers.get(job.taskId)
          if (ws) ws.delete(worker)
          item.reject(new Error(msg.error))
          this.processQueue()
        }
      }
    })

    worker.on('error', (err) => {
      if (item.retries < this.maxRetries) {
        item.retries++
        this.running--
        this.queue.unshift(item)
        this.processQueue()
      } else {
        this.running--
        const ws = this.taskWorkers.get(job.taskId)
        if (ws) ws.delete(worker)
        item.reject(err)
        this.processQueue()
      }
    })
  }

  getStats(taskId: string) {
    const downloaded = this.taskTotalDownloaded.get(taskId) || 0
    const total = this.taskTotalSize.get(taskId) || 0
    const startTime = this.taskStartTimes.get(taskId) || Date.now()
    const elapsed = (Date.now() - startTime) / 1000
    const speed = elapsed > 0 ? downloaded / elapsed : 0
    return { downloaded, total, speed, elapsed }
  }
}

let poolInstance: WorkerPool | null = null

export function getPool(maxWorkers = 8): WorkerPool {
  if (!poolInstance) {
    poolInstance = new WorkerPool(maxWorkers)
  }
  return poolInstance
}
