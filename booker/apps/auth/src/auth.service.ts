import { Injectable } from '@nestjs/common';
import { UserDocument } from './users/models/user.schema';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

@Injectable()
export class AuthService {

  constructor(private readonly configService: ConfigService, private readonly jwtService: JwtService) {}

  // login 方法用于在用户登录成功后生成 JWT token 并将 token 写入到响应的 cookie 中
  async login(user: UserDocument, response: Response) {
    const tokenPayload = { userId: user._id.toHexString() }; // userId 是一个自定义的字段，用于存储用户的 ID
    const expires = new Date() // 设置 token 的过期时间，Date() 构造函数返回当前时间
    

    expires.setSeconds(
      expires.getSeconds() + this.configService.get('JWT_EXPIRATION')
    )

    const token = this.jwtService.sign(tokenPayload) // sign 方法用于生成 JWT token, 参数是一个对象，用于存储 token 的 payload

    response.cookie('Authentication', token, { // 将 token 写入到响应的 cookie 中
      httpOnly: true, // httpOnly 设置为 true，表示只能通过 HTTP 协议访问 cookie, 然后在auth controller中的login方法中调用, 通过response.send(user)返回user信息
      expires,
    })
  }







}
