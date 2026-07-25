import { dbUser } from "./mysql";
import test from 'node:test'
import assert from 'assert'
async function run() {
  test('创建用户1', async () => {
    const usr = await dbUser.createUser("Alice", 32)
    console.log('usr1', usr)
    assert.equal({ name: 'Alice', age: 32 }, usr)
  })
  test('创建用户2', async () => {
    const usr = await dbUser.createUser("Jack", 29)
    console.log('usr2', usr)
    assert.equal({ name: 'Jack', age: 29 }, usr)
  })

  const allUser = await dbUser.findAll()
  console.log('allUser', allUser)

  test('查找ID为1的用户', async () => {
    const usrOne = await dbUser.findOne(1)
    console.log('usrOne', usrOne)
    assert.equal({ name: 'Alice', age: 32 }, usrOne)
  })
}

run()