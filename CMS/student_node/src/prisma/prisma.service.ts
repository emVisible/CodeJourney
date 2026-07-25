import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'
import { PrismaClient } from '@prisma/client';

/**
 * 数据库日志输出
*/
@Injectable()
export class PrismaService extends PrismaClient {
  constructor(configService: ConfigService) {
    super(
      configService.get('app.isDev')
        ? { log: ['query', 'error', 'info', 'warn'] }
        : undefined
    )
  }
}
