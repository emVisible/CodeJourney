
/**
 * 标准输入输出
*/

import { stdin, exit, version as _version, env as _env, cwd, argv } from 'process'

stdin.on('data', (data) => {
  if (data == 'exit') exit(-1)
  const currentMsg = {
    version: _version, // 当前Node版本
    env: _env, // 环境变量
    workDirectory: cwd(), // 当前工作目录
    args: argv, // 传入node的参数
    data: data //tsdin输入
  }
  Object.entries(currentMsg).forEach(item => {
    stdin.write(item)
  })
})