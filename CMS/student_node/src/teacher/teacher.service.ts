import { Injectable } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { QueryTeacherByNameDto } from './dto/query-teacher.dto';
import { DeleteTeacherByTidDto } from './dto/del-tid.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TeacherService {
  constructor(private client: PrismaService) { }
  /**
   * 创建教师
  */
  async createTeacher(createTeacherDto: CreateTeacherDto) {
    await this.client.teacher.create({
      data: createTeacherDto
    })
    return "创建成功"
  }

  /**
   * 获取所有教师
  */
  async getAllTeacher() {
    return await this.client.teacher.findMany({
      where: {}
    })
  }

  /**
   * 通过t_id查询教师
  */
  async queryTeacherByTid(t_id: string) {
    return await this.client.teacher.findFirst({
      where: {
        t_id
      }
    })
  }

  /**
   * 通过教师名查询教师
  */
  async findTeacherByName(queryDto: QueryTeacherByNameDto) {
    const { name } = queryDto
    return await this.client.teacher.findFirst({
      where: {
        name
      }
    })
  }

  /**
   * 更新教师信息
  */
  async updateTeacher(updateTeacherDto: UpdateTeacherDto) {
    const { t_id } = updateTeacherDto
    const teacher = await this.queryTeacherByTid(t_id)
    await this.client.teacher.update({
      where: {
        id: teacher.id
      },
      data: updateTeacherDto
    })
    return "教师信息更新成功"
  }

  /**
   * 删除教师
  */
  async removeTeacher(removeDto: DeleteTeacherByTidDto) {
    const { t_id } = removeDto
    const aim = await this.queryTeacherByTid(t_id)
    await this.client.teacher.delete({
      where: {
        id: aim.id,
        t_id
      }
    })
    return "教师信息删除成功"
  }
}
