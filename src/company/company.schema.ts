import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { User } from '../user/user.schema';

export type CompanyDocument = Company & Document;

@Schema({ toJSON: { getters: true } })
export class Company {
  /*
    Properties
  */
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User', autopopulate: true })
  ownedBy: User | string;

  @Prop({ required: true, trim: true })
  name: string;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
