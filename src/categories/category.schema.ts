import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema({ toJSON: { getters: true } })
export class Category {
  /*
    Properties
  */
  @Prop({ required: true, trim: true })
  name: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
