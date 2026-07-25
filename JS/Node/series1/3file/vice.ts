import { error } from 'console'
import fs from 'fs'
import fsPromise from 'fs/promises'
{
  /**
   * fs.readFile
   * fs.readFileSync
   * fsPromise.readFile
   * 三种方法均为全部写入内存读取, 对于大文件, 应该采用stram读取
  */
  const method1 = () => {
    fs.readFile('./demo.txt', 'utf-8', (err: NodeJS.ErrnoException, data: string) => {
      if (err) {
        error(err)
        return;
      }
      console.log('data', data)
    })
  }

  const method2 = () => {
    try {
      const data = fs.readFileSync('./demo.txt', 'utf-8')
      console.log('data', data)
    } catch (e) {
      error(e)
    }
  }

  const method3 = async () => {
    try {
      const data = await fsPromise.readFile('./demo.txt', 'utf-8')
      console.log('data', data)
    } catch (e) {
      error(e)
    }
  }

  const run = () => {
    method1()
    method2()
    method3()
  }
  run()
}
{
  /**
   * 文件写操作, 默认为覆盖操作
  */
  const method1 = () => {
    fs.writeFile('./demo.txt', 'new content by1', (err: NodeJS.ErrnoException) => {
      if (err) {
        error(err)
      }
    })
  }
  const method2 = () => {
    try {
      fs.writeFileSync('./demo.txt', 'new content by2', 'utf-8')
    } catch (e) {
      error(e)
    }
  }

  const method3 = async () => {
    try {
      await fsPromise.writeFile('./demo.txt', 'new content by3', 'utf-8')
    } catch (e) {
      error(e)
    }
  }
  method1()
  method2()
  method3()
}
{
  /**
   * 追加操作
  */
  const method1 = () => {
    fs.appendFile('./demo.txt', '\nappend content by1', { encoding: 'utf-8' }, (err) => {
      if (err) error(err)
    })
  }
  const method2 = async () => {
    try {
      await fsPromise.appendFile('./demo.txt', '\nappend content by2', { encoding: 'utf-8' })
    } catch (e) {
      error(e)
    }
  }
  method1()
  method2()
}