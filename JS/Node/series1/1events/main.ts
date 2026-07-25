import { log } from 'console'
import * as events from 'events'

const eventEmiter = new events.EventEmitter()
/**
 * 执行顺序
 *    1 main loop
 *    2 nextTick
 *    3 microtask queue
 *    4 macrotask queue
*/

/**
 * 注册handle event
*/
const listener = eventEmiter.on('handle', (...arg: string[]) => {
  console.log('🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹')
  console.log("test start")
  console.log('🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹')
  process.nextTick(() => {
    log('2 ' + arg)
    log("3 handle in nextTick queue")
  })
  setImmediate(() => {
    log('5 handle macrotask queue successfully')
  })
  Promise.resolve("handle in microtask queue")
    .then(msg => {
      console.log('4 ' + msg)
    })

  log("1 handle in main loop")
}
)

/**
 * 执行test开始算起, 3s内每隔1s执行一次注册到event loop的handle event
*/
function test() {
  if (!eventEmiter.listenerCount('handle')) {
    return;
  }
  eventEmiter.emit('handle', 'handle', 'demo', 'for learning event emitter')
  setTimeout(test, 1000)
}

setImmediate(test)

setTimeout(() => {
  listener.removeAllListeners()
  console.log('🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸')
  console.log("test end")
  console.log('🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸')
}, 3000);