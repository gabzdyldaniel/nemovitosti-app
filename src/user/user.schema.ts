import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ toJSON: { getters: true } })
export class User {
  /*
    Properties
  */
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, trim: true })
  surname: string;

  @Prop({
    required: true,
    match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
  })
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ trim: true })
  phoneNumber: string;

  /*
    Getters
  */
  @Prop({
    get: function() {
      return `${this.name} ${this.surname}`;
    }
  })
  fullName: string;

  @Prop({
    get: function() {
      return `${this.name[0]}${this.surname[0]}`;
    }
  })
  initials: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
