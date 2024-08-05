import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDocument } from './users/models/user.schema';

const getCurrentUserByContext = (context: ExecutionContext) : UserDocument => {
  return context.switchToHttp().getRequest().user;
}


// 自定义CurrentUser装饰器，用于在 NestJS 控制器的处理函数中获取当前用户的信息

export const CurrentUser = createParamDecorator( // createParamDecorator用于创建自定义参数装饰器
  // data 参数是一个可选参数，用于传递额外的数据给装饰器
  // context 参数是一个 ExecutionContext 对象，包含了当前请求的上下文信息
  (_data: unknown, context: ExecutionContext) => getCurrentUserByContext(context),
);