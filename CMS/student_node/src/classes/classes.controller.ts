import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { QueryClassesDto } from './dto/query-classes.dto';
import { CreateClassesDto } from './dto/create-classes.dto';
import { UpdateClassesDto } from './dto/update-classes.dto';
import { DeleteClassesDto } from './dto/delete-classes.dto';
import { QueryClassesStudentDto } from './dto/query-classes-student.dto';

@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) { }
  /**
   * 创建班级
  */
  @Post()
  createClass(@Body() dto: CreateClassesDto) {
    return this.classesService.createClass(dto)
  }

  /**
   * 获取全部班级信息
  */
  @Get()
  getAllClass() {
    return this.classesService.getAllClass()
  }

  /**
   * 通过name查询班级
  */
  @Post('/query')
  queryClass(@Body() dto: QueryClassesDto) {
    return this.classesService.queryClassByName(dto)
  }

  /**
   * 通过cl_id查询学生信息
  */
  @Post('/query/class')
  queryStudentByClId(@Body() dto: QueryClassesStudentDto) {
    return this.classesService.queryStudentByClId(dto)
  }

  /**
   * 更新班级信息
  */
  @Patch('/update')
  updateClass(@Body() dto: UpdateClassesDto) {
    return this.classesService.updateClass(dto)
  }

  /**
   * 删除班级
  */
  @Delete('/delete')
  deleteClass(@Body() dto: DeleteClassesDto) {
    return this.classesService.deleteClass(dto)
  }
}
