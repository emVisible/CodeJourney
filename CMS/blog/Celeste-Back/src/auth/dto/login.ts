
import { IsNotEmpty } from 'class-validator'
import IsExist from '../../common/rules/isExist'
export default class LoginDto {
  @IsNotEmpty({ message: '用户名不可为空' })
  @IsExist('user', {message:'帐号不存在'})
  name: string
  @IsNotEmpty({ message: '密码不可为空' })
  password: string
}