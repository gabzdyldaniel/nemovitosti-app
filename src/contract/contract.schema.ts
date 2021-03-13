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

  @Prop({ type: Number, min: 1, max: 28 })
  payday: number;

  @Prop()
  note: string;

  @Prop({ type: Number, required: true })
  rent: number;

  @Prop({ type: Number, required: true })
  energyDeposit: number;

  @Prop({ type: Number, required: false, default: 0 })
  additionalFees: number;

  @Prop({
    type: [
      {
        dueDate: {
          type: Date,
          required: [true, "Payment's dueDate is required!"]
        },
        paid: {
          type: Boolean,
          default: false
        },
        amount: {
          type: Number,
          required: [true, "Payment's amount is required!"]
        },
        note: {
          type: String
        }
      }
    ],
  })
  payments: Payment[];
}

interface Tenant {
  name: string;
  surname: string;
  birthNumber: string;
  phoneNumber: string;
}

interface Payment {
  dueDate: Date;
  paid: boolean;
  amount: number;
  note: string;
}

// TBD
// interface Issue {
//   issueType: string;
//   description: string;
// }

export const ContractSchema = SchemaFactory.createForClass(Contract);
