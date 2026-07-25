import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';
import { PrismaModule } from './prisma/prisma.module';
import { TeacherModule } from './teacher/teacher.module';
import { ClassesModule } from './classes/classes.module';
import { CourseModule } from './course/course.module';
import { RelationsModule } from './relations/relations.module';
import app from './config/app';

@Module({
  imports: [
    StudentModule,
    TeacherModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [app]
    }),
    ClassesModule,
    CourseModule,
    RelationsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }