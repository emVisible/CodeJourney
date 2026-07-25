import https from 'https'

const url = 'https://api.juejin.cn/content_api/v1/content/article_rank?category_id=1&type=hot&count=3&from=1&aid=2608&uuid=7145810834685003271&spider=0'

// https.get() 高级API接口
https.get(url, (response) => {
  let data = ""
  response.on('data', (d) => {
    data += d
  })
  response.on('end', () => {
    console.log('data end: ', data)
  })
  response.on('error', (err: Error) => {
    console.error('err', err)
  })
})

const req = https.get(url)
req.on('response',()=>{
  // 同上
})


