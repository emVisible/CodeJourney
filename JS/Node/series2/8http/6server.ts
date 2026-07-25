import http from 'http'
const server = http.createServer((request, response) => {
  /**
   * 处理Request, 主要是两大方面:
   *   method && url
   *
   *   headers
   *   body
   *   query
  */
  const { url, method, headers } = request
  console.log('url', url)
  console.log('method', method)

  let body: any = []
  const query = Object.fromEntries(new URL(url!, "http://127.0.0.1").searchParams) //拆分路由参数到对象中
  console.log('query', query)
  request.on('data', (chunk: Buffer) => {
    body.push(chunk)
  })
  request.on('end', () => {
    body = Buffer.concat(body).toString()
    body = JSON.parse(body)
    console.log('body', body)
  })
  console.log('headers',headers)


  /**
   * 相应Response, 通过SSR返回数据
  */
  response.statusCode = 200 // 设置状态码
  response.setHeader("Content-Type", 'text/html') // 设置相应头-Content-Type描述传递的数据类型
  response.write("<h1>💠💠💠💠💠💠💠💠💠💠</h1>") // 设置相应体, 通过write可以多次返回
  response.end(`
    <h1>Server Running</h1>
    <p>${url}</p>
    <p>${method}</p>
  `) // 设置响应体
})

server.listen(4275, () => {
  console.log('Server running')
})