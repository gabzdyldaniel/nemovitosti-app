import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type IssueTypeDocument = IssueType & Document;

@Schema({ toJSON: { getters: true } })
export class IssueType {
  /*
    Properties
  */
  @Prop({ required: true, trim: true })
  name: string;
}

export const IssueTypeSchema = SchemaFactory.createForClass(IssueType);
