// https.request() 低级API接口
import https from 'https'

const url = new URL('https://api.juejin.cn/content_api/v1/content/article_rank?category_id=1&type=hot&count=3&from=1&aid=2608&uuid=7145810834685003271&spider=0')
console.log('url',url)
let data = ""
const request = https.request({
  method: 'GET',
  port: 443,
  hostname: url.hostname,
  path: url.pathname + url.search,
}, (res) => {
  res.on('data', (d) => {
    data += d
  })
  res.on('end', ()=>{
    console.log('data',data)
  })
})
request.end()

