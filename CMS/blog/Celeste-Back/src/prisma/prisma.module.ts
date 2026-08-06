import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

/**
 * 定义为全局模块, 导出对应的服务
*/
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService]
})
export class PrismaModule { }
