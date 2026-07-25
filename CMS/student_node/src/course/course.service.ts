import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { PrismaService } from '../prisma/prisma.service';
import { QueryCourseByNameDto } from './dto/query-course.dto';
import { RemoveCourseDto } from './dto/remove-course.dto';
import { UpdateCourseClassDto } from './dto/update-course-class.dto';
import _ from 'lodash';
import { StudentService } from '../student/student.service';
import { ClassesService } from '../classes/classes.service';

@Injectable()
export class CourseService {
  constructor(private client: PrismaService, private studentService: StudentService, private classesService: ClassesService) { }

  /**
   * 创建课程
  */
  async createCourse(createCourseDto: CreateCourseDto) {
    const { c_id, hours, name, redit, t_id, class_list } = createCourseDto
    await this.client.course.create({
      data: {
        c_id,
        hours,
        name,
        redit,
        t_id,
        class_list
      }
    })
    return "创建课程成功"
  }

  /**
   * 获取全部课程
  */
  async getAllCourse() {
    return await this.client.course.findMany({
      where: {}
    })
  }

  /**
   * 通过c_id查询课程信息
  */
  async queryCourseByCid(c_id: string) {
    return await this.client.course.findFirst({
      where: {
        c_id
      }
    })
  }

  /**
   * 通过name查询课程信息
  */
  async queryCourseByName(queryDto: QueryCourseByNameDto) {
    const { name } = queryDto
    return await this.client.course.findFirst({
      where: {
        name
      }
    })
  }

  /**
   * 学生通过cl_id获取课程
   * 筛选classlist中包含cl_id的课程
  */
  async filterCourseByClId(s_id: string) {
    const student = await this.studentService.queryStudentBySid(s_id)

    return this.client.course.findMany({
      where: {
        class_list: {
          contains: student.cl_id
        }
      }
    })
  }
  /**
   * 教师通过t_id获取课程
   * 筛选classlist中t_id列包含t_id的所有课程
  */
  async filterCourseByTid(t_id: string) {
    return this.client.course.findMany({
      where: {
        t_id: {
          contains: t_id
        }
      }
    })
  }
  /**
   * 开课班级
   * 根据教师id和课程name查询开课班级
  */
  async filterClassByTeacherIdAndCourseName(t_id: string, name: string) {
    const res = await this.client.course.findMany({
      where: {
        AND: {
          t_id: {
            contains: t_id
          },
          name: {
            contains: name
          }
        }
      }
    })
    return res.map(cls => cls.class_list)
  }

  /**
   * 学生列表
   * 根据cid和tid获取学生列表
  */
  async filterStudentByCidAndTid(c_id: string, t_id: string) {
    let res = []
    const allClasses = await this.client.course.findFirst({
      where: {
        AND: {
          c_id: {
            contains: c_id
          },
          t_id: {
            contains: t_id
          }
        }
      }
    })
    const classIds = allClasses.class_list.split(',')
    for (const clId of classIds) {
      const tmp = await this.studentService.queryStudentsByClid(clId)
      res.push(...tmp)
    }
    return res
  }

  /**
   * 更新课程信息
  */
  async updateCourse(dto: UpdateCourseDto) {
    const { c_id, hours, name, redit, t_id } = dto
    const aim = await this.queryCourseByCid(dto.c_id)
    await this.client.course.update({
      where: {
        id: aim.id
      },
      data: {
        c_id,
        hours,
        name,
        redit,
        t_id
      }
    })
    return "修改课程信息成功"
  }

  /**
   * 更新开课班级
  */
  async updateCourseClass(dto: UpdateCourseClassDto) {
    const { c_id, class_list } = dto
    const aim = await this.queryCourseByCid(c_id)
    await this.client.course.update({
      where: {
        id: aim.id,
      },
      data: {
        class_list
      }
    })
    return "授课班级更新成功"
  }

  /**
   * 删除课程
  */
  async removeCourse(dto: RemoveCourseDto) {
    const { c_id } = dto
    const aim = await this.queryCourseByCid(c_id)
    await this.client.course.delete({
      where: {
        id: aim.id
      }
    })
    return "删除课程成功"
  }
}
