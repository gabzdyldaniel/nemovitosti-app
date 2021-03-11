import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CityDocument = City & Document;

@Schema({ toJSON: { getters: true } })
export class City {
  /*
    Properties
  */
  @Prop({ required: true, trim: true })
  name: string;
}

export const CitySchema = SchemaFactory.createForClass(City);
