
import { IsNotEmpty } from 'class-validator'
import IsNotExist from '../../common/rules/isNotExist'
import IsConfirm from '../../common/rules/isConfirm'
export default class RegisterDto {
  @IsNotEmpty({ message: '用户名不可为空' })
  @IsNotExist('user', { message: '用户已注册' })
  name: string
  @IsConfirm({ message: '两次密码不一致 ' })
  @IsNotEmpty({ message: '密码不可为空' })
  password: string
  @IsNotEmpty({ message: '确认密码不可为空' })
  password_confirm: string
}