import express from 'express'
import registRoutes from './routes'
import registMiddleware from './middleware'

const port = 3000
const app = express()

registMiddleware(app)
registRoutes(app)



app.listen(port, () => {
  console.log("[System] Start!")
})