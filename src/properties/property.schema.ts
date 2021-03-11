import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { User } from '../users/user.schema';

export type PropertyDocument = Property & Document;

@Schema({ toJSON: { getters: true } })
export class Property {
  /*
    Properties
  */
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  ownedBy: User;
  @Prop({ required: true })
  area: number;
  @Prop({ required: true })
  address: string;
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'City' })
  city: any; // TODO
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  category: any; // TODO
  @Prop({ required: true })
  description: string;
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'RealEstateAgency' })
  realEstateAgency: any; // TODO
  @Prop([{ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Contract' }])
  contracts: any; // TODO

  /*
    Getters
  */
}

export const PropertySchema = SchemaFactory.createForClass(Property);
