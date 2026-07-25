import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StudentService {
  constructor(private client: PrismaService) { }

  /**
   * 创建学生
  */
  async createStudent(createStudentDto: CreateStudentDto) {
    const { s_id } = createStudentDto
    const signal = await this.alreadyExist(s_id)
    if (signal) {
      return '用户已存在'
    } else {
      const { gender, name, s_id, cl_id } = createStudentDto
      await this.client.student.create({
        data: {
          gender,
          name,
          s_id,
          cl_id
        }
      })
      return "创建成功"
    }
  }

  /**
   * 通过姓名查找学生
  */
  async queryStudentByName(name: string) {
    return this.client.student.findMany({
      where: {
        name
      }
    })
  }

  /**
   * 获取全部学生
  */
  async getAllStudent() {
    return await this.client.student.findMany({
      where: {}
    })
  }

  /**
   * 通过s_id查询学生
  */
  async queryStudentBySid(s_id: string) {
    return await this.client.student.findFirst({
      where: {
        s_id: s_id
      }
    })
  }

  /**
   * 通过cl_id查询所有符合条件的学生
  */
  async queryStudentsByClid(cl_id: string) {
    return await this.client.student.findMany({ where: { cl_id } })
  }

  /**
   *  修改学生信息
  */
  async updateStudent(updateStudentDto: UpdateStudentDto) {
    const { s_id } = updateStudentDto
    const signal = await this.alreadyExist(s_id)
    if (!signal) return '学生不存在, 无法更新'
    await this.client.student.update({
      where: {
        id: signal.id,
        s_id
      },
      data: updateStudentDto
    })
    return "更新成功"
  }

  /**
   * 删除学生
  */
  async removeStudent(s_id: string) {
    const signal = await this.alreadyExist(s_id)
    if (!signal) return '学生不存在, 无法删除'
    await this.client.student.delete({
      where: {
        id: signal.id,
        s_id
      }
    })
    return "删除成功"
  }

  /**
   * 学生是否存在, 若存在返回学生
   * @param s_id string
  */
  async alreadyExist(s_id: string) {
    return await this.queryStudentBySid(s_id)
  }
}
