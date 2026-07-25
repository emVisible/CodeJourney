import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common'
import { Request } from 'express'
import { map } from 'rxjs/operators'

/**
 * 全局拦截器, 规范返回格式
*/
@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest() as Request
    const startTime = Date.now()
    return next.handle().pipe(
      map((data) => {
        const endTime = Date.now()
        new Logger().log(`TIME:${endTime - startTime}\tURL:${request.path}\tMETHOD:${request.method}`)
        return {
          data,
          code: request.statusCode,
          msg: request.statusMessage
        }
      }),
    )
  }
}