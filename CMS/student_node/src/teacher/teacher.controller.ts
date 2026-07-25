import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { QueryTeacherByNameDto } from './dto/query-teacher.dto';
import { DeleteTeacherByTidDto } from './dto/del-tid.dto';
import { QueryClassListByTidDto } from './dto/query-classlist.dto';

@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) { }

  /**
   * 创建教师
  */
  @Post()
  createTeacher(@Body() createTeacherDto: CreateTeacherDto) {
    return this.teacherService.createTeacher(createTeacherDto);
  }

  /**
   * 获取全部教师
  */
  @Get()
  getAllTeacher() {
    return this.teacherService.getAllTeacher();
  }

  /**
   * 通过name查询教师信息
  */
  @Post('/query')
  queryByName(@Body() queryDto: QueryTeacherByNameDto) {
    return this.teacherService.findTeacherByName(queryDto);
  }

  /**
   * 更新教师信息
  */
  @Patch('/update')
  updateTeacher(@Body() updateTeacherDto: UpdateTeacherDto) {
    return this.teacherService.updateTeacher(updateTeacherDto);
  }

  /**
   * 删除教师
  */
  @Delete('/delete')
  removeTeacher(@Body() deleteTeacherDto: DeleteTeacherByTidDto) {
    return this.teacherService.removeTeacher(deleteTeacherDto);
  }
}
