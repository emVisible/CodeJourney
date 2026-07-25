import fs from 'fs';
import prisma from '../../../packages/prisma/prisma';
import { MCP_Repo } from '@prisma/client';
const data: MCP_Repo[] = JSON.parse(fs.readFileSync('./init.json', 'utf-8'));


const insertData = async () => {
  try {
    for (const item of data) {
      await prisma.mCP_Repo.create({
        data: {
          repo: item.repo,
          desc: item.desc,
          tags: item.tags,
          star: item.star,
          lang: item.lang,
          update: new Date(item.update),
        },
      });
    }
    console.log('✅ 数据插入成功');
  } catch (error) {
    console.error('插入数据失败:', error);
  } finally {
    await prisma.$disconnect();
  }
};

insertData();
