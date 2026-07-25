
import { Express } from 'express'
import path from 'path'
export default function response(app: Express) {
  app.get('/json', (req, res) => {
    res.json({
      cpuUsage: process.cpuUsage(),
      mem: process.memoryUsage()
    })
  })
  app.get('/download', (req, res) => {
    res.download(path.join(__dirname, 'package.json'))
  })
  app.get('/header', (req, res)=>{
    res.set("Content-Type", "application/json")
    res.set("token", "young")
    res.send("<h1>Welcome!</h1>")
  })
}