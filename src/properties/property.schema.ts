import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { User } from '../user/user.schema';
import { City } from '../city/city.schema';
import { RealEstateAgency } from '../real-estate-agency/real-estate-agency.schema';
import { Category } from '../category/category.schema';

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
  city: City;
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  category: Category;
  @Prop({ required: true })
  description: string;
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'RealEstateAgency' })
  realEstateAgency: RealEstateAgency;
  @Prop([{ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Contract' }])
  contracts: any; // TODO

  /*
    Getters
  */
}

export const PropertySchema = SchemaFactory.createForClass(Property);
