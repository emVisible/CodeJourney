/**
 * Timers
*/
const timers = () => {
  let intervalSig = true
  const interval = setInterval(() => {
    if (!intervalSig) clearInterval(interval)
    intervalSig = false
    console.log("Interval")
  }, 1000)


  process.nextTick(() => {
    console.log("Next Tick")
  })
  setImmediate(() => {
    console.log("Immediate")
  })
  setTimeout(() => {
    console.log("Timeout")
  })
}
timers()