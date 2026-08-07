import { PrismaService } from '../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

/**
 * 基于Passport的JWT身份验证策略, 使用时命名为jwt
 *   @params configService 用于获取ENV变量
 *   @params prisma 用于返回用户数据
*/
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(configService: ConfigService, private prisma: PrismaService) {
    super({
      // jwtFormRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 加密的密钥
      secretOrKey: configService.get('TOKEN_SECRET'),
      // jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt')
      // 从用户提交的请求中提取JWT Token方法 => 从请求头中提取
      // 解析用户提交的Bearer Token Header数据
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    })
  }
  // jwt验证通过后返回用户资料
  async validate({ sub: id }) {
    return this.prisma.user.findUnique({
      where: { id }
    })
  }
}