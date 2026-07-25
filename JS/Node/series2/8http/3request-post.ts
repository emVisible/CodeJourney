import https from 'https'
const url = new URL('https://api.juejin.cn/content_api/v1/content/article_rank?category_id=1&type=hot&count=3&from=1&aid=2608&uuid=7145810834685003271&spider=0')

let data = ""
/**
 * 请求建立
*/
const request = https.request({
  method: 'POST',
  port: 443,
  path: url.pathname + url.search,
  host: url.hostname,
  headers: {
    "Content-Type": ' application/json'
  }
}, (response) => {
  response.on('data', (chunk) => {
    data += chunk
  })
  response.on('end', () => {
    console.log('data', data)
  })
})
/**
 * 写入请求体
*/
request.write(JSON.stringify({ name: 'xm' }))
/**
 * 请求完成
*/
request.end()