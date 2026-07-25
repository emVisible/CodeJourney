import { Express, json, static as expressStatic} from "express";
export default function registMiddleware(app: Express) {
  app.use(json())

  app.use(expressStatic('public'))

  app.use((req, res, next) => {
    const { query, hostname, method, path, headers, body } = req
    const reqMsg = {
      method,
      path,
      hostname,
      query,
      headers,
      body
    }
    console.log('[Middleware-Preprocessing] recieve request: ', reqMsg)
    next()
  })
}