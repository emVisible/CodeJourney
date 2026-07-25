/**
 * Buffer用于处理二进制数据, 所以涉及到输入和输出的转换
*/
const buffer1 = Buffer.alloc(10) // 基本声明


/**
 * 输入转换
*/
const buffer2 = Buffer.from("from string") // string 2 bytes

/**
 * 输出转换
*/
const res = buffer2.toString() // bytes 2 string
const resBase64 = buffer2.toString('base64') // bytes 2 string
const res2 = Array.from(buffer2) // bytes 2 Array


/**
 * 写入
 *   直接写入会覆盖, 需要指定位置
*/
buffer1.write('hello')
buffer1.write('world',5)
console.log('buffer1',buffer1.toString())

/**
 * 合并
*/
const combineBuffer = Buffer.concat([buffer1, buffer2])
console.log('combineBuffer',combineBuffer.toString())


console.log('buffer1',typeof buffer1)
console.log('res',typeof res)
console.log('res2',res2)