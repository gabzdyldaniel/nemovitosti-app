import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ContractDocument = Contract & Document;

@Schema({ toJSON: { getters: true } })
export class Contract {
  @Prop({
    type: [
      {
        name: {
          type: String,
          required: [true, "Tenant's name is required!"]
        },
        surname: {
          type: String,
          required: [true, "Tenant's surname is required!"]
        },
        birthNumber: {
          type: String,
          required: [true, "Tenant's birthNumber is required!"]
        },
        phoneNumber: {
          type: String,
          required: [true, "Tenant's phoneNumber is required!"]
        }
      }
    ],
    required: true,
    validate : {
      validator : function(array) {
        return Array.isArray(array) && array.length > 0;
      },
      message: props => `${props.value} has to be specified!`
    }
  })
  tenants: Tenant[];

  @Prop([String])
  facilities: string[];

  @Prop({ type: Date, required: true })
  fromDate: Date;

  @Prop({ type: Date, required: true })
  tillDate: Date;

  @Prop()
  note: string;
}

interface Tenant {
  name: string;
  surname: string;
  birthNumber: string;
  phoneNumber: string;
}

export const ContractSchema = SchemaFactory.createForClass(Contract);
