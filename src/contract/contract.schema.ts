import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Issue, IssueSchema } from '../issue/issue.schema';

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
    default: []
  })
  payments: Payment[];

  @Prop([IssueSchema])
  issues: Issue[];

  @Prop({
    get: function() {
      const now = Date.now();
      const fromDate = this.fromDate.getTime();
      const tillDate = this.tillDate.getTime();

      return now >= fromDate && now <= tillDate;
    }
  })
  active: boolean;
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

export const ContractSchema = SchemaFactory.createForClass(Contract);
