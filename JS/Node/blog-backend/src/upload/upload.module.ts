import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { MulterModule } from '@nestjs/platform-express'
import { extname } from 'path';
import { diskStorage } from 'multer';
import { UploadController } from './upload.controller';

/**
 * 定义nest存储位置
*/
@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory() {
        return {
          storage: diskStorage({
            destination: 'uploads',
            filename: (req, file, callback) => {
              const path = Date.now() + '-' + Math.round(Math.random() * 1e10) + extname(file.originalname)
              callback(null, path)
            },
          })
        }
      }
    })
  ],
  providers: [UploadService],
  controllers: [UploadController]
})
export class UploadModule { }
