import { Module } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { ClassesController } from './classes.controller';
import { RelationsService } from '../relations/relations.service';
import { StudentService } from '../student/student.service';
import { CourseService } from '../course/course.service';

@Module({
  controllers: [ClassesController],
  providers: [ClassesService, RelationsService, StudentService, CourseService],
  exports:[ClassesService]
})
export class ClassesModule { }
