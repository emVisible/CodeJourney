import { IsNotEmpty } from "class-validator"

export class CreateArticleDto {
  @IsNotEmpty({ message: '文章标题不可为空' })
  title: string
  @IsNotEmpty({ message: '文章内容不可为空' })
  content: string

  @IsNotEmpty({ message: '请添加栏目' })
  categoryId: number
}
