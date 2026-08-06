import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ArticleModule } from './article/article.module';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './category/category.module';
import { UploadModule } from './upload/upload.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [AuthModule, PrismaModule, ArticleModule, ConfigModule.forRoot({
    isGlobal: true
  }), CategoryModule, UploadModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
