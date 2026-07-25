let sig = 0
let isStop = false
export function task() {
  while (!isStop) {
    if (sig++ == 1000) isStop = true
  }
  console.log("[System] Run Over.")
}

export function useTask() {
  requestIdleCallback(task)
}