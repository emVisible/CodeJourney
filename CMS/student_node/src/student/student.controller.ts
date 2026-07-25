import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentNameDto } from './dto/query-name.dto';
import { StudentSidDto } from './dto/del-sid.dto';
import { QueryStudentClassListDto } from './dto/query-student-classlist.dto';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) { }

  /**
   * 创建学生
  */
  @Post()
  createStudent(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.createStudent(createStudentDto);
  }

  /**
   * 根据名称查找学生
  */
  @Post('/query')
  queryStudentByName(@Body() queryDto: StudentNameDto) {
    const { name } = queryDto
    console.log('name', name)
    return this.studentService.queryStudentByName(name);
  }

  /**
   * 查找全部学生
  */
  @Get()
  getAllStudent() {
    return this.studentService.getAllStudent();
  }

  // /**
  //  * 根据sid查询课表
  // */
  // @Post('/query/classlist')
  // queryClassListBySid(@Body() dto: QueryStudentClassListDto) {
  //   const { s_id } = dto
  //   return this.studentService.queryClassListBySid(s_id);
  // }


  /**
   * 更新学生信息
  */
  @Patch('/update')
  updateStudent(@Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.updateStudent(updateStudentDto);
  }

  /**
   * 删除学生
  */
  @Delete('/delete')
  removeStudent(@Body() deleteDto: StudentSidDto) {
    const { s_id } = deleteDto
    return this.studentService.removeStudent(s_id);
  }
}
