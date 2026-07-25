import util from 'util'
import {stringify} from 'javascript-stringify'

const complexObj = {
  a: {
    arr: [12,4,1],
    obj:{
      arr2:[3,2,4],
      name:'a-obj'
    }
  },
  createdAt: "20240101",
  func:()=>{
    console.log(this)
  }
}
/**
 * 使用包 > util.inspect > 原始对象 > JSON.stringify
*/
const resExceptFunction = JSON.stringify(complexObj) // 使用JSON.stringify()可以展开数组和对象, 但会丢失函数
const res = util.inspect(complexObj, {depth: 10}) // 使用util.inspect()指定其深度可以展开对象和数组
const resStringify = stringify(complexObj) //使用javascript-stringify()详细查看数组、对象、函数

console.log('origin', complexObj)
console.log('res',res)
console.log('resExceptFunction',resExceptFunction)
console.log('resStringify',resStringify)