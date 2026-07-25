import { Express } from "express"
const userData = [
  {
    id: 1,
    name: "young"
  },
  {
    id: 2,
    name: "alex"
  },
  {
    id: 3,
    name: "flex"
  }
]

export default function restful(app: Express) {
  app.get('/users', (req, res) => {
    res.json(userData)
  })
  app.get('/users/:id', (req, res) => {
    const id = req.params.id
    const usr = userData.find((value, index) => value.id == Number(id))
    res.json(usr)
  })
  app.post('/usrs', (req, res) => {
    const name = req.body.name
    const newUser = {
      name,
      id: userData.length + 1
    }
    userData.push(newUser)
    res.json("[System] Append user OK." + newUser)
  })
  app.put('/users/:id', (req, res) => {
    const usr = userData.find((user, index) => {
      return user.id == Number(req.params.id)
    })
    usr.name = req.body.name
    res.json("[System] Put user's name OK." + usr.name)
  })
  app.delete('/users/:id', (req, res)=>{
    const index = userData.findIndex((user, index)=>user.id == Number(req.params.id))
    const delUsr = userData[index]

    userData.splice(index, 1)
    res.json("[System] Delete user OK." + delUsr)
  })
}