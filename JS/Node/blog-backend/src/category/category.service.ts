import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) { }
  /**
   * 创建栏目
  */
  create(createCategoryDto: CreateCategoryDto) {
    return this.prisma.category.create({
      data: {
        title: createCategoryDto.title
      }
    })
  }

  /**
   * 查看所有栏目
  */
  findAll() {
    return this.prisma.category.findMany()
  }

  /**
   * 查找指定栏目
  */
  findOne(id: number) {
    return this.prisma.category.findFirst({
      where: { id }
    })
  }

  /**
   * 更新栏目
  */
  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.prisma.category.update({
      where: { id },
      data: updateCategoryDto
    })
  }

  /**
   * 删除栏目
  */
  remove(id: number) {
    return this.prisma.category.delete({
      where: { id }
    })
  }
}
