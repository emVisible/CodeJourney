import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash, verify } from 'argon2';
import { PrismaService } from '../prisma/prisma.service';
// import LoginDto from '@/auth/dto/login';
import RegisterDto from './dto/register';
import LoginDto from './dto/login';
// import { PrismaService } from '@/prisma/prisma.service';


@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) { }

  // 注册用户
  async register(dto: RegisterDto) {
    // 创建用户，将密码哈希化后存储到数据库
    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        password: await hash(dto.password)
      }
    });

    // 生成并返回一个身份验证令牌
    return this.token(user);
  }

  // 登录
  async login(dto: LoginDto) {
    // 查找用户, 若不存在则返回BadRequest
    const user = await this.prisma.user.findUnique({
      where: {
        name: dto.name
      }
    })
    if (!verify(user.password, dto.password)) {
      throw new BadRequestException('密码输入错误')
    }
    // 若查找到, 返回user token
    return this.token(user)
  }

  // 生成身份验证令牌
  private async token({ id, name }) {
    // 使用用户的名称和ID生成JWT令牌
    return {
      token: await this.jwt.signAsync({
        name,
        sub: id
      })
    };
  }
}
