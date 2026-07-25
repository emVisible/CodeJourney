import { error, log } from 'console'
import path from 'path'

import fs from 'fs'
import fsPromises, { FileHandle } from 'fs/promises'
import util from 'util'

/**
 * 文件名称、文件扩展名、文件路径操作
*/
const file = "./main.ts"

const logMsg = (fileName: string) => {
  log(path.basename(fileName))
  log(path.dirname(fileName))
  log(path.extname(fileName))
  log(path.basename(fileName, path.extname(fileName)))

  log(path.join('C:/__temp', fileName))
  log(path.resolve(__dirname, path.basename(fileName)))
}
logMsg(file)


// ==================================================
/**
 * 文件打开操作
 *
 * fd(file descriptor)代表文件资源
 * 常用flags:
 *   r 只读, 文件必须存在
 *   r+ 读写
 *   w+ 从头读写
 *   a  追加，不可读
 *   a+ 从尾读写
*/
fs.open('./demo.txt', 'a+', (error: NodeJS.ErrnoException, fd: number) => {
  console.log('fd', fd)
})

const readSync = () => {
  try {
    const fd = fs.openSync('./demo.txt', 'a+')
    console.log('fd', fd)
  } catch (e) {
    error(e)
  }
}
readSync()

/**
 * 高版本异步读取
*/
const readAsync = async () => {
  let fileHandle: FileHandle
  try {
    fileHandle = await fsPromises.open('./demo.txt', 'a+')
    console.log('fileHandle.fd', fileHandle.fd)
    const res = await fileHandle.readFile({ encoding: 'utf-8' })
    console.log('res', res)
  } catch (e) {
    error(e)
  } finally {
    if (fileHandle) {
      await fileHandle.close()
    }
  }
}

readAsync()

/**
 * 低版本异步读取
*/
const readAsync2 = async () => {
  const open: (path: fs.PathLike, flag: fs.OpenMode, mode?: fs.Mode) => Promise<number> = util.promisify(fs.open)
  const fd: number = await open('./demo.txt', 'r')
  console.log('fd(low version)', fd)
}
readAsync2()

