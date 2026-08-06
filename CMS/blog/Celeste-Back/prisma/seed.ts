import { PrismaClient } from '@prisma/client'
import { Random } from 'mockjs'
import { hash } from 'argon2'

const prisma = new PrismaClient()
async function run() {
  await prisma.user.create({
    data: {
      name: 'admin',
      password: await hash('preview'),
      role: 'admin'
    }
  })
  for (let i = 1; i <= 5; i++) {
    await prisma.category.create({
      data: {
        title: Random.ctitle(3, 6)
      }
    })
  }
  for (let i = 0; i < 50; i++) {
    await prisma.article.create({
      data: {
        title: Random.ctitle(10, 30),
        content: Random.cparagraph(30, 50),
        categoryId: Random.integer(1, 5)
      }
    })
  }
}

run()