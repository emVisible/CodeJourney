/**
 * fork
 *   创建子进程, 通过父-子进程通讯与事件监听, 实现多个NodeJs实例的运行
*/
import { Serializable, fork } from "child_process";

const child = fork("child.mjs")
child.on('message', (message: Serializable) => {
  const msg = message.toString()
  console.log('[System] message recieved: ', msg)
  if (msg == 'exit') {
    child.kill()
    console.log("[System] child exit")
  }
})

child.send("Start")
setTimeout(() => {
  child.send("Stop")
}, 3000)