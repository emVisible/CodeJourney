import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { QueryCourseByNameDto } from './dto/query-course.dto';
import { RemoveCourseDto } from './dto/remove-course.dto';
import { UpdateCourseClassDto } from './dto/update-course-class.dto';
import { QueryStudentClassListDto } from './dto/query-classlist-student.dto';
import { QueryTeacherClassListDto } from './dto/query-classlist-teacher.dto';
import { QueryClassesDto } from 'src/classes/dto/query-classes.dto';
import { QueryClassDto } from './dto/query-class.dto';
import { QueryStudentClassDto } from './dto/query-student-class.dto';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) { }

  /**
   * 创建课程
  */
  @Post()
  createCourse(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.createCourse(createCourseDto);
  }

  /**
   * 获取全部课程
  */
  @Get()
  getAllCourse() {
    return this.courseService.getAllCourse();
  }

  /**
   * 通过name查询课程
  */
  @Post('/query')
  queryCourseByName(@Body() dto: QueryCourseByNameDto) {
    return this.courseService.queryCourseByName(dto);
  }

  /**
   * 课表
   * 学生获取课表
  */
  @Post('/query/classlist/student')
  queryStudentClassList(@Body() dto: QueryStudentClassListDto) {
    const { s_id } = dto
    return this.courseService.filterCourseByClId(s_id);
  }

  /**
   * 课表
   * 教师获取课表
  */
  @Post('/query/classlist/teacher')
  queryTeacherClassList(@Body() dto: QueryTeacherClassListDto) {
    const { t_id } = dto
    return this.courseService.filterCourseByTid(t_id);
  }

  /**
   * 班级
   * 根据教师id和课程名称查询class
  */
  @Post('/query/class')
  queryClass(@Body() dto: QueryClassDto) {
    const { name, t_id } = dto
    return this.courseService.filterClassByTeacherIdAndCourseName(t_id, name);
  }

  /**
   * 学生列表
  */
  @Post('/query/studentlist')
  queryStudentClass(@Body() dto: QueryStudentClassDto) {
    const { c_id, t_id } = dto
    return this.courseService.filterStudentByCidAndTid(c_id, t_id)
  }
  /**
   * 更新课程信息(通用)
  */
  @Patch('/update')
  updateCourse(@Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.updateCourse(updateCourseDto);
  }

  /**
   * 更新课程对应的班级信息
  */
  @Patch('/update/class')
  updateCourseClass(@Body() updateCourseDto: UpdateCourseClassDto) {
    return this.courseService.updateCourseClass(updateCourseDto);
  }

  /**
   * 创建课程
  */
  @Delete('/delete')
  removeCourse(@Body() dto: RemoveCourseDto) {
    return this.courseService.removeCourse(dto);
  }
}
