import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CurrentUser } from './current-user.decorator';
import { UserDocument } from './users/models/user.schema';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard) // local strategy 是passport-local提供的一个策略，用于验证用户的用户名和密码，适用于需要在本地数据库中验证用户的情况，需要配置passport并定义如何验证用户凭据
  @Post('login')
  async login(
    @CurrentUser() user: UserDocument, // CurrentUser 装饰器用于获取当前用户的信息
    @Res({ passthrough: true }) response: Response
  ) {
    await this.authService.login(user, response);
    response.send(user);
  }

}
