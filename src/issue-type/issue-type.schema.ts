import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { User } from '../user/user.schema';

export type IssueTypeDocument = IssueType & Document;

@Schema({ toJSON: { getters: true } })
export class IssueType {
  /*
    Properties
  */
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User', autopopulate: true })
  ownedBy: User | string;

  @Prop({ required: true, trim: true })
  name: string;
}

export const IssueTypeSchema = SchemaFactory.createForClass(IssueType);
