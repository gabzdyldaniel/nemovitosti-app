import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RealEstateAgencyDocument = RealEstateAgency & Document;

@Schema({ toJSON: { getters: true } })
export class RealEstateAgency {
  /*
    Properties
  */
  @Prop({ required: true, trim: true })
  name: string;
}

export const RealEstateAgencySchema = SchemaFactory.createForClass(RealEstateAgency);
