/**
 * ESM中使用Global Var——__filename和__dirname
*/
import {dirname} from 'path'
import {fileURLToPath} from 'url'

console.log(globalThis === global)

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

console.log('__dirname',__dirname)
console.log('__filename',__filename)