import { IsNotEmpty } from "class-validator";

export class CreateCategoryDto {
  @IsNotEmpty({ message: '类别标题不可为空' })
  title: string
}
