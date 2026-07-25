/**
 * 回调转Promise
*/

import util from 'util'
import fs from 'fs'
import path from 'path'

const rsRead = util.promisify(fs.readFile)
rsRead(path.join(process.cwd(), 'package.json'))
  .then((data) => {
    console.log('data', data.toString())
  })


/**
 * Promise转回调
*/

const promise1 = () => Promise.resolve("RESOLVE")
const promise2 = () => Promise.reject("REJECT")
const callback1 = util.callbackify(promise1)
const callback2 = util.callbackify(promise2)

callback1((err, data) => {
  if (err) {
    return
  }
  console.log('data', data)
})
callback2((err:any):void => {
  if (err) {
    console.error('err', err)
    return
  }
})