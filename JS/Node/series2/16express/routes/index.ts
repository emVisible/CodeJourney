
import { Express } from "express";
import response from "./response";
import restInit from "./rest";
import restful from "./restful";
import upload from "./upload"
export default function registRoutes(app: Express) {
  const routes = [response, restInit, restful]
  routes.forEach((item) => {
    item(app)
  })
  app.use(upload)
}