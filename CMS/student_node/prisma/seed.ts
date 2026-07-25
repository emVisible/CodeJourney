import { PrismaClient } from '@prisma/client'
import relations from './data/relations'
import teacher from './data/teacher'
import course from './data/course'
import classes from './data/classes'
import student from './data/student'

const prisma = new PrismaClient()

const loadCourse = async () => {
  return await prisma.course.createMany({
    data: course
  }).then(_ => 'ok')
}
const loadTeacher = async () => {
  return await prisma.teacher.createMany({
    data: teacher
  }).then(_ => 'ok')
}
const loadStudent = async () => {
  await prisma.student.createMany({
    data: student
  }).then(_ => 'ok')
}

const loadRelations = async () => {
  await prisma.relations.createMany({
    data: relations
  }).then(_ => 'ok')
}
const loadClasses = async () => {
  await prisma.classes.createMany({
    data: classes
  }).then(_ => 'ok')
}
async function loadData() {
  await Promise.all([
    loadRelations(),
    loadTeacher(),
    loadClasses(),
    loadStudent(),
    loadCourse()
  ])
    .catch((reason) => {
      console.error('reason', reason)
      return
    })
    .finally(() => {
      console.log("[System] 数据初始化结束")
    })
}

loadData()