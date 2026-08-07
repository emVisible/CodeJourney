import { SetMetadata, UseGuards, applyDecorators } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Role } from "../enum";
import { RoleGuard } from "../guards/role.guard";

/**
 * 自定义Nest聚合装饰器, 用于在router guard上设置guard和metadata
 * @param roles 同时需要满足的角色
*/
export function Auth(...roles: Role[]) {
  /**
   * @method applyDecorators 通过applyDecorators应用多个装饰器
   * @param SetMetadata 将路由处理程序上的元数据设置为 roles，并将传递给 Auth 装饰器的 roles 参数传递给它, SetMetadata可以通过Reflect.getMetadata处理
   * @param UseGuards 将两个路由守卫与路由处理程序关联
  */
  return applyDecorators(SetMetadata('roles', roles), UseGuards(AuthGuard('jwt'), RoleGuard))
}