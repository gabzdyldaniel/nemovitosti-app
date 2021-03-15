import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema({ toJSON: { getters: true }, _id: true })
export class Tenant {
  _id: mongoose.Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, trim: true })
  surname: string;

  @Prop({ required: true, trim: true })
  phoneNumber: string;

  @Prop({
    required: true,
    match: /^[0-9]{6}\/[0-9]{4}$/,
    trim: true
  })
  birthNumber: string;
}

export const TenantSchema = SchemaFactory.createForClass(Tenant);
