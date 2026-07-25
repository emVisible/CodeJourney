import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RelationsService {
  constructor(private client: PrismaService) { }

  /**
   * 获取关联表信息
  */
  async getRelations() {
    return await this.client.relations.findMany({
      where: {}
    })
  }

  /**
   * 通过cl_id从关联表中查询
  */
  async queryByClId(cl_id: string) {
    return await this.client.relations.findMany({
      where: {
        cl_id
      }
    })
  }
}