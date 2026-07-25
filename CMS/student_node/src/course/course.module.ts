import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { StudentService } from '../student/student.service';
import { ClassesService } from '../classes/classes.service';

@Module({
  controllers: [CourseController],
  providers: [CourseService,StudentService, ClassesService],
  exports:[CourseService]
})
export class CourseModule {}
