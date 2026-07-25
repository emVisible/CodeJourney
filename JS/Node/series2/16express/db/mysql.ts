import { Sequelize, INTEGER, STRING } from 'sequelize'
const sequelize = new Sequelize("mysql://root:preview32@localhost:3306/__temp")

const User = sequelize.define(
  'user',
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: STRING(50),
      allowNull: false
    },
    sex: {
      type: STRING(20),
      allowNull: false
    },
  },
  {
    tableName: 'users',
    timestamps: false
  }
)
async function createUser(name: string, sex: number) {
  const user = await User.create({ name, sex })
  console.log('🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹')
  console.log("[System] User created.")
  console.log('🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹')
  return user.toJSON()
}

async function findAll() {
  const users = await User.findAll()
  return users.map((user: any) => user.toJSON())
}

async function findOne(id: number) {
  const user = await User.findByPk(id)
  return user.toJSON()
}

async function update(id: number, name: string, age: number) {
  const user = await User.findByPk(id)
  if (user) {
    // user.name = name
    // user.age = age
    console.log('user', user)
    user.save()
  }
}

async function deleteOne(id: number) {
  const user = await User.findByPk(id)
  if (user) {
    user.destroy()
    console.log('🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸')
    console.log("[System] User deleted.")
    console.log('🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸')
  }
  return user
}

export const dbUser = {
  User,
  createUser,
  findAll,
  findOne,
  update,
  deleteOne
}
