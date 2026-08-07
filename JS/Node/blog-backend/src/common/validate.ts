import { HttpException, HttpStatus, ValidationError, ValidationPipe } from "@nestjs/common";

/**
 * 全局自定义验证规则-自定义验证规则
 * 返回: HttpException 422 请求包含的实体无法被处理
 *   提交的表单数据可能有无效的字段，或者数据格式可能正确，但值不在有效范围内
*/
export default class extends ValidationPipe {
  // 重写flattenValidationErrors, 以数组形式返回
  protected flattenValidationErrors(validationErrors: ValidationError[]): string[] {
    const errors = {}
    validationErrors.forEach((error) => {
      errors[error.property] = Object.values(error.constraints)[0]
    })
    throw new HttpException({
      code: 422,
      messages: errors
    }, HttpStatus.UNPROCESSABLE_ENTITY)
    return []
  }
}