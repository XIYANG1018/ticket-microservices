import { AbstractDocument } from "@app/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export class Reservation {}

@Schema({ versionKey: false }) // 为了避免在数据库中生成 __v 字段，我们在 Schema 装饰器中传入 versionKey: false
export class ReservationDocument extends AbstractDocument {
  @Prop()
  timeStamp: Date;
  @Prop()
  startDate: Date;
  @Prop()
  endDate: Date;
  @Prop()
  userId: string;
  @Prop()
  placeId: string;
  @Prop()
  invoiceId: string;


}

export const ReservationSchema = SchemaFactory.createForClass(ReservationDocument);
