import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
/**
 * 继承PrismaClient, 记录query查询
*/
@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      log: ['query']
    })
  }
}
