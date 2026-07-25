import { error, log } from 'console'
import * as fs from 'fs'
import * as fsPromise from 'fs/promises'

class Stat {
  stat: fs.Stats
  constructor() {
    // this.stat_async()
    this.stat_async2()
  }
  public stat_sync() {
    console.log('🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹')
    console.log("start")
    console.log('🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹')
    try {
      const stats = fs.statSync('./demo.txt')
      console.log('stats', stats)
    } catch (e) {
      error(e)
    }
    console.log('🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸')
    console.log("end")
    console.log('🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸')
  }
  /**
   * 使用promise based stat
  */
  public async stat_async() {
    this.stat = await new Promise((resolve, reject) => {
      fs.stat('./demo.txt', (err, stat) => {
        if (err) {
          error(err)
          reject(err)
        }
        resolve(stat)
      })
    })
  }
  /**
   * 使用fsPromise的stat, 简化异步操作
  */
  public async stat_async2() {
    try {
      this.stat = await fsPromise.stat('./demo.txt')
    } catch (e) {
      console.error('e', e)
    }
  }
  public isDirectory() {
    return this.stat.isDirectory() || "Error"
  }
  public isFile() {
    return this.stat.isFile() || "Error"
  }

}

new Promise((resolve, reject) => {
  resolve(new Stat())
})
  .then((s: Stat) => {
    setTimeout(() => {
      const isDir = s.isDirectory()
      const isFile = s.isFile()
      log(`${isDir ? "dir" : isFile ? "file" : "unknown type"}`)
    }, 1000)
  })