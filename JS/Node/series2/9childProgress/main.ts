/**
 * 子进程的创建与使用
*/

import { spawn, exec, execFile } from "child_process";
import path from 'path'

/**
 * spawn
 *   启动子进程用于执行特定命令, 可以通过流式数据通信同子进程进行交互
*/
const childProgress = spawn('ls', ['-lh'])
childProgress.stdout.on('data', (chunk) => {
  console.log('chunk', chunk.toString())
})

/**
 * exec
 *   使用shell执行特定命令, 其传参与shell中相同
*/
const pwd = exec('pwd')
pwd.stdout?.on('data', (chunk: Buffer) => {
  console.log('chunk', chunk.toString())
})


/**
 * execFile
 *   无需通过shell, 直接执行文件
*/
const execData = execFile(path.join(__dirname, 'test'))
execData.stdout?.on('data',(chunk)=>{
  console.log('chunk',chunk)
})