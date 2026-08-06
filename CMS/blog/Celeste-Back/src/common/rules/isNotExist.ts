import { PrismaClient } from "@prisma/client";
import { ValidationOptions, registerDecorator, ValidationArguments } from "class-validator";

/**
 * 自定义验证-内容不存在
 *   注册装饰器, 内部重写validator方法验证规则
 *   当在[table]表中找不到[args.property]属性时, 返回true
*/
export default function IsNotExist(
  table: string,
  validationOptions?: ValidationOptions
) {
  return function (object: Record<string, any>, propertyName: string) {
    // 注册自定义装饰器
    registerDecorator({
      name: 'IsNotExist',
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
          return !Boolean(res)
        }
      }
    })
  }
}