import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { QueryClassesDto } from './dto/query-classes.dto';
import { CreateClassesDto } from './dto/create-classes.dto';
import { UpdateClassesDto } from './dto/update-classes.dto';
import { DeleteClassesDto } from './dto/delete-classes.dto';
import { QueryClassesStudentDto } from './dto/query-classes-student.dto';
import { StudentService } from '../student/student.service';

@Injectable()
export class ClassesService {
  constructor(private client: PrismaService, private studentService: StudentService) { }

  /**
   * 创建班级
  */
  async createClass(dto: CreateClassesDto) {
    await this.client.classes.create({
      data: dto
    })
    return "创建班级成功"
  }

  /**
   * 创建班级
  */
  async getAllClass() {
    return this.client.classes.findMany({
      where: {}
    })
  }

  /**
   * 通过cl_id查询符合条件的学生
  */
  async queryStudentByClId(dto: QueryClassesStudentDto) {
    const { cl_id } = dto
    return await this.studentService.queryStudentsByClid(cl_id)
  }

  /**
   * 通过cl_id查询班级
  */
  async queryClassById(cl_id: string) {
    return await this.client.classes.findFirst({
      where: { cl_id }
    })
  }

  /**
   * 通过name查询班级
  */
  async queryClassByName(dto: QueryClassesDto) {
    const { name } = dto
    return await this.client.classes.findFirst({
      where: {
        name
      }
    })
  }

  /**
   * 更新班级信息
  */
  async updateClass(dto: UpdateClassesDto) {
    const { cl_id } = dto
    const aim = await this.queryClassById(cl_id)

    await this.client.classes.update({
      where: { id: aim.id },
      data: dto
    })
    return "更新班级成功"
  }

  /**
   * 删除班级
  */
  async deleteClass(dto: DeleteClassesDto) {
    const { cl_id } = dto
    const aim = await this.queryClassById(cl_id)
    await this.client.classes.delete({
      where: { id: aim.id }
    })
    return "删除班级成功"
  }
}
