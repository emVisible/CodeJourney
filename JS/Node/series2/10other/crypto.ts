import crypto, { createCipheriv, createDecipheriv } from 'crypto'

/**
 * 哈希算法
*/
const testStr = "This is the crypto module."
const crypto_sha = crypto.createHash('sha256').update(testStr).digest('hex')
const crypto_md5 = crypto.createHash('md5').update(testStr).digest('hex')
console.log('crypto_sha', crypto_sha)
console.log('crypto_md5', crypto_md5)

/**
 * 随机数生成
*/
const randomNum = crypto.randomBytes(32).toString('hex')
console.log('randomNum', randomNum)

/**
 * 加密与解密
*/

const encrypt = (data: string) => {
  console.log('Original data: ', data)

  // 加密 && 解密算法所需的: 算法, 密钥, iv(initialization vector)初始化向量
  const algorithm = "aes-256-cbc"
  const passwd = crypto.randomBytes(32)
  const iv = crypto.randomBytes(16)

  const cipher = createCipheriv(algorithm, passwd, iv) // 加密算法实例
  let encrypedData = cipher.update(data, 'utf-8', 'hex') // 加密
  encrypedData += cipher.final('hex')

  console.log('encrypedData', encrypedData)

  const decryptedData = decrypt(encrypedData, algorithm, passwd, iv)
  console.log('decryptedData',decryptedData)
}

const decrypt = (encryptedData: any, algorithm:string, passwd:Buffer, iv:Buffer) => {
  const decipher = createDecipheriv(algorithm, passwd, iv)
  let decrypedData = decipher.update(encryptedData, 'hex', 'utf-8')
  decrypedData += decipher.final('utf-8')
  return decrypedData
}
encrypt("Hello world!")