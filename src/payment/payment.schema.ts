import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Payment {
  @Prop({ default: Date.now })
  created?: number;

  @Prop({ required: true })
  dueDate?: Date;

  @Prop({ default: false })
  paid?: boolean;

  @Prop({ required: true })
  note: string;

  @Prop({ required: true, })
  amount: number;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
