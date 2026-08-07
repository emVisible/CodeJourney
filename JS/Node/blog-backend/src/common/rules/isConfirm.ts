import { PrismaClient } from "@prisma/client";
import { ValidationOptions, registerDecorator, ValidationArguments } from "class-validator";

/**
 * 自定义验证-确认密码
 *   注册装饰器, 内部重写validator方法验证规则
 *   当在[table]表中找不到[args.property]属性时, 返回true
*/
export default function IsNotExist(
  validationOptions: ValidationOptions
) {
  return function (object: Record<string, any>, propertyName: string) {
    // 注册自定义装饰器
    registerDecorator({
      name: 'IsConfirm',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      // 覆盖validator方法
      validator: {
        async validate(value: string, args: ValidationArguments) {
          return Boolean(value == args.object[`${args.property}_confirm`])
        }
      }
    })
  }
}