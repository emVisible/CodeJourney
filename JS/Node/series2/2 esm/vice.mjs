// 只需要通过索引文件, 使用解构导入即可
import { index, tmp, func } from './index.mjs'
const res = func.sayHello()
console.log('res', res)
console.log('tmp', tmp)
console.log('index', index)