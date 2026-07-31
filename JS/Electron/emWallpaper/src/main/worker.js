const { workerData, parentPort } = require('worker_threads')

const { url, start, end, index, taskId, headers } = workerData

let downloaded = 0

const fetchChunk = async () => {
  try {
    const fetchHeaders = { ...headers, Range: `bytes=${start}-${end}` }
    const response = await fetch(url, {
      method: 'GET',
      headers: fetchHeaders
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    const reader = response.body.getReader()
    const chunks = []

    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      chunks.push(value)
      downloaded += value.length
      parentPort.postMessage({
        type: 'progress',
        index,
        taskId,
        loaded: downloaded,
        total: end - start + 1
      })
    }

    const totalLength = chunks.reduce((acc, c) => acc + c.length, 0)
    const buffer = new Uint8Array(totalLength)
    let offset = 0
    for (const c of chunks) {
      buffer.set(c, offset)
      offset += c.length
    }

    parentPort.postMessage({ type: 'progress', index, taskId, loaded: totalLength, total: end - start + 1 })
    parentPort.postMessage({ type: 'chunk', index, taskId, data: buffer.buffer })
  } catch (error) {
    parentPort.postMessage({ type: 'error', index, taskId, error: error.message })
  }
}

fetchChunk()
