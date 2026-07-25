#!/usr/bin/node
import { error, log } from 'console'
import fs from 'fs'
import path from 'path'

const folderName = path.resolve(__dirname, 'newDir')
/**
 * 创建文件夹
*/
const createDir = () => {
  try {
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName)
    }
  } catch (e) {
    error(e)
  }
}
createDir()

/**
 * 读取文件夹里的内容
*/
const readDir = () => {
  const files = fs.readdirSync(folderName)
    .map(fileOriginName => path.join(folderName, fileOriginName))
    .filter(fileName => {
      const isFile = fs.lstatSync(fileName).isFile()
      // 如果子层不是文件, 则修改文件夹名称
      if (!isFile) {
        const patterns = fileName.split('\\').pop().concat()
        const newName = fileName.replace(patterns, 'renameAfterDir')
        fs.rename(fileName, newName, (err) => {
          if (err) error(err)
        })
      } else {
        return fileName
      }
    })
  console.log('files', files)
}
readDir()

/**
 * 移除文件夹
*/
const removeDir = () => {
  log('waste dir will remove after 3s')
  const dirPath: string = path.resolve(__dirname, 'waste')
  fs.mkdirSync(dirPath)
  setTimeout(() => {
    fs.rmdirSync(dirPath)
  }, 3000)
}
/**
 * 递归移除文件夹以及文件夹下的所有内容
*/
const removeAll = () => {
  const dirPath: string = path.resolve(__dirname, 'waste')
  fs.rm(dirPath, { recursive: true, force: true }, (err) => {
    if (err) error(err)
  })
}
removeDir()
// removeAll()
