import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ArticleService {
  constructor(private prisma: PrismaService, private config: ConfigService) { }
  /**
   * 发表文章(需要守卫验证)
  */
  create(createArticleDto: CreateArticleDto) {
    return this.prisma.article.create({
      data: {
        title: createArticleDto.title,
        content: createArticleDto.content,
        categoryId: +createArticleDto.categoryId
      }
    })
  }

  /**
   * 查找所有文章
   *  分页返回数据, 根据meta通过全局拦截器修改data包裹
   *  返回meta和data两部分数据
  */
  async findAll(key: string, page: number, row: number) {
    // 每页包含多少数据
    // const row = this.config.get("ARTICLE_PAGE_ROW")
    // 每次携带的文章
    console.log('key',key)
    const articles = await this.prisma.article.findMany({
      where: {
        categoryId: +key
      },
      skip: (page - 1) * row,
      take: +row,
    })
    // 总共有多少条数据
    const total = await this.prisma.article.count()
    return {
      meta: {
        current_page: page,
        page_row: row,
        total,
        total_page: Math.ceil(total / row) // 总共有多少页
      },
      data: articles
    }
  }
  /**
   * 查找文章
  */
  findOne(id: number) {
    try {
      return this.prisma.article.findFirst({
        where: { id }
      })
    } catch (e) {
      throw new Error(e)
    }
  }

  /**
   * 更新文章
  */
  update(id: number, updateArticleDto: UpdateArticleDto) {
    return this.prisma.article.update({
      where: { id },
      data: { ...updateArticleDto, categoryId: updateArticleDto.categoryId }
    })
  }

  /**
   * 删除文章
  */
  remove(id: number) {
    return this.prisma.article.delete({
      where: { id }
    }
    )
  }
}