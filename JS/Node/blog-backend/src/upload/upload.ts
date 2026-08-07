import { UnsupportedMediaTypeException, UseInterceptors, applyDecorators } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";

/**
 * 上传装饰器，用于处理文件上传请求。
 * @param field 上传文件的字段名称，默认为 'file'。
 * @param options 配置选项对象，传递给文件上传中间件。
 */
export function Upload(field = 'file', options: MulterOptions) {
  return applyDecorators(UseInterceptors(FileInterceptor(field, options)))
}

/**
 * 创建文件过滤器函数，用于验证上传的文件是否符合指定的文件类型。
 * @param type 允许的文件类型（如 'image' 或 'document'）。
 */
export function filterFilter(type: string) {
  return (req: any, file: Express.Multer.File, callback: (error: Error | null, acceptFile: boolean) => void) => {
    if (!file.mimetype.includes(type)) {
      callback(new UnsupportedMediaTypeException('文件类型错误'), false);
    } else {
      callback(null, true);
    }
  }
}

/**
 * 图片上传装饰器，对 Upload 装饰器的进一步封装，用于处理图片上传。
 * @param field 上传文件的字段名称，默认为 'file'。
 */
export function UploadImage(field = 'file') {
  return Upload(field, {
    limits: {
      fileSize: Math.pow(1024, 2) * 2, // 2MB 文件大小限制
    },
    fileFilter: filterFilter('image'), // 只允许上传图片文件
  } as MulterOptions);
}

/**
 * 文档上传装饰器，对 Upload 装饰器的进一步封装，用于处理文档上传。
 * @param field 上传文件的字段名称，默认为 'file'。
 */
export function UploadDocument(field = 'file') {
  return Upload(field, {
    limits: {
      fileSize: Math.pow(1024, 2) * 5, // 5MB 文件大小限制
    },
    fileFilter: filterFilter('document'), // 只允许上传文档文件
  } as MulterOptions);
}
