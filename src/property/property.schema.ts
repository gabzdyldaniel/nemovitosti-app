import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { User } from '../user/user.schema';
import { City } from '../city/city.schema';
import { Category } from '../category/category.schema';
import { Contract } from '../contract/contract.schema';

export type PropertyDocument = Property & Document;

@Schema({ toJSON: { getters: true } })
export class Property {
  /*
    Properties
  */
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  ownedBy: User | string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  area: number;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'City', autopopulate: true })
  city: City;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Category', autopopulate: true })
  category: Category;

  @Prop()
  description: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Contract', autopopulate: true }])
  contracts: Contract[];

  /*
    Getters
  */
  @Prop({
    get: function() {
      return this.contracts.some(contract => contract.active);
    }
  })
  isInhabited: boolean;

  @Prop({
    default: null,
    get: function() {
      return this.contracts.find(contract => contract.active) ?? null
    }
  })
  activeContract: Contract;
}

export const PropertySchema = SchemaFactory.createForClass(Property);
