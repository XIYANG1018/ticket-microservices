import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRootAsync({ // forRootAsync is used to provide configuration options, forRoot is used to provide a URI
    useFactory: (configService: ConfigService) => ({
      uri: configService.get('MONGODB_URI'),
    }),
    inject: [ConfigService],
   
  })
  ],
})
export class DatabaseModule {
  static forFeature(models: ModelDefinition[]) {
    return MongooseModule.forFeature(models);
  }
}
// 这个forFeature()方法是一个静态方法，用于导入模型定义数组。这个方法返回一个MongooseModule.forFeature()方法的调用，该方法接受一个模型定义数组作为参数。这个方法将这些模型定义添加到模块的导入中，以便在整个模块中使用这些模型。

//通过 MongooseModule.forRootAsync() 方法，可以异步地配置连接字符串，从 ConfigService 中获取 MongoDB 的 URI。
