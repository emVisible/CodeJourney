import { Express } from 'express'
export default function restInit(app: Express) {
  app.get('', (req, res) => {
    res.end("Hi")
  })
  app.all('/api/all', (req, res) => {
    const { method } = req
    res.send(`${method.toUpperCase()} request`)
  })
  app.get('/api/get', (req, res) => {
    res.send("get")
  })
  app.post('/api/post', (req, res) => {
    res.send("post")
  })
  app.put('/api/put', (req, res) => {
    res.send("put")
  })
  app.delete('/api/delete', (req, res) => {
    res.send("delete")
  })

  /**
   * 链式路由
   *   避免重复的路由名称
  */
  app.route('/chain')
    .all((req, res, next) => {
      console.log("PRE-PROCESSING")
      next()
    })
    .get((req, res) => {
      res.send("===GET===")
    })
    .post((req, res) => {
      res.send("===POST===")
    })
    .put((req, res) => {
      res.send("===PUT===")
    })
    .delete((req, res) => {
      res.send("===DELETE===")
    })
}