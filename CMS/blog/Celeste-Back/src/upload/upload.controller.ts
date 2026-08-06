import { Controller, Post, UploadedFile } from '@nestjs/common';
import { UploadImage } from './upload';

@Controller('upload')
export class UploadController {
  constructor() {

  }

  @Post('image')
  @UploadImage()
  image(@UploadedFile() file: Express.Multer.File) {
    return file
  }
}
