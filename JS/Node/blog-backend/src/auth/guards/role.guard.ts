import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { user } from '@prisma/client';
import { Observable } from 'rxjs';
import { Role } from '../enum';
/**
 * 路由守卫（RoleGuard），用于检查用户是否具有特定角色权限以决定是否允许访问某个路由
*/
@Injectable()
export class RoleGuard implements CanActivate {
  /**
   * @param reflector
   * 构造函数中接受一个参数 reflector，它是一个 Reflector 类的实例，
   * 用于反射操作，特别是获取路由处理程序上设置的元数据。
  */
  constructor(private reflector: Reflector) { }
  /**
   * 实现接口, 用于是否能够访问路由
  */
  canActivate(context: ExecutionContext,): boolean | Promise<boolean> | Observable<boolean> {
    // 通过context获取传递的user对象, 其来源是jwt的AuthGuard
    const user = context.switchToHttp().getRequest().user as user
    // 从路由处理程序和类中获取设置的 roles 元数据
    const roles = this.reflector.getAllAndMerge<Role[]>('roles', [context.getHandler(), context.getClass()])
    console.log('user', user)
    console.log('roles', roles)
    return roles.length ? roles.some(role => role == user.role) : true
  }
}