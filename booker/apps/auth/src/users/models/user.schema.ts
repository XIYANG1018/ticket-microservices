import { AbstractDocument } from "@app/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export class User {}

@Schema({ versionKey: false }) // 为了避免在数据库中生成 __v 字段，我们在 Schema 装饰器中传入 versionKey: false
export class UserDocument extends AbstractDocument {
  @Prop()
  email: string

  @Prop()
  password: string



}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
