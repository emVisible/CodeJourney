import { PrismaClient } from "@prisma/client";
import { ValidationOptions, registerDecorator, ValidationArguments } from "class-validator";

/**
 * 自定义验证-用户存在
 *   注册装饰器, 内部重写validator方法验证规则
*/
export default function IsExist(
  table: string,
  validationOptions?: ValidationOptions
) {
  return function (object: Record<string, any>, propertyName: string) {
    // 注册自定义装饰器
    registerDecorator({
      name: 'IsExist',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [table],
      options: validationOptions,
      // 覆盖validator方法
      validator: {
        async validate(value: string, args: ValidationArguments) {
          const prisma = new PrismaClient()
          const res = await prisma[table].findFirst({
            where: {
              [args.property]: value
            }
          })
          // 找不到时返回true
          return Boolean(res)
        }
      }
    })
  }
}