/**
 * Node中的事件循环有六个阶段, 每进入一个阶段都会去回调队列中执行回调函数
 *   1. timers (SetTimeout, SetInterval)
 *   2. pending callbacks / IO callbacks (OS回调, 比如网络)
 *   3. idle/prepare (Node内部使用)
 *   4. poll (处理到达的IO并阻塞等待)
 *   5. check (SetImmediate)
 *   6. close callbacks (事件结束的回调)
 * Node中的微任务队列有两个, 分别是nextTick队列和Promise队列, 先执行nextTick队列, 再执行promise队列
 *   1. nextTick队列 (process.nextTick相关回调)
 *     在特定阶段调用nextTick时会中断IO直到nextTick回调执行完毕, 当nextTick队列操作事件过长会阻塞IO
 *   2. Promise队列 (Js中的promise操作相关回调)
 * 执行顺序总结:
 *   同步 -> 异步(微任务)
 *   同步 -> 微任务队列 -> poll -> check-> timer
 *   sync -> nextTick -> promise -> poll -> check -> timer
*/
// ==============================================================================================
import fs from 'fs'

process.on('exit', () => {
  console.log('11')
})

// 异步读取文件 执行顺序不确定
fs.readFile('./test.txt', () => {
  console.log('10')
})

/**
 * setTimeout只是事件注册, 执行要到下一回
*/
setTimeout(() => {
  console.log('8')
}, 0)
setTimeout(() => {
  console.log('9')
}, 0)

process.nextTick(() => {
  console.log('2')
  Promise.resolve().then(() => {
    console.log('5')
  })
  process.nextTick(() => {
    console.log('3')
    process.nextTick(() => {
      console.log('4')
    })
  })
})

/**
 * check在当前事件循环迭代的末尾直接执行，而不需要等待下一个迭代。
*/
setImmediate(() => {
  console.log('6')
  Promise.resolve().then(() => {
    console.log('7')
  })
})

console.log('1')
