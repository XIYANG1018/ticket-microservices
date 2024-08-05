import { Prop, Schema } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";

@Schema()
export class AbstractDocument {
  @Prop({ type: SchemaTypes.ObjectId})
  _id: Types.ObjectId;
}

// 以上代码定义了一个抽象的文档类，用于其他文档类继承，包含了一个 _id 字段，类型为 ObjectId。