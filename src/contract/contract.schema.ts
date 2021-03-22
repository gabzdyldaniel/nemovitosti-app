import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Issue, IssueSchema } from '../issue/issue.schema';
import { Payment, PaymentSchema } from '../payment/payment.schema';
import { Tenant, TenantSchema } from '../tenant/tenant.schema';
import { BadRequestException, HttpException, HttpStatus } from '@nestjs/common';

export type ContractDocument = Contract & Document;

@Schema({ toJSON: { getters: true } })
export class Contract {
  _id: mongoose.Types.ObjectId;

  @Prop({
    type: [TenantSchema],
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

  @Prop({ type: Number, required: true, min: 1, max: 28 })
  payday: number;

  @Prop()
  note: string;

  @Prop({ type: Number, required: true })
  rent: number;

  @Prop({ type: Number, required: true })
  energyDeposit: number;

  @Prop({ type: Number, required: false, default: 0 })
  additionalFees: number;

  @Prop([PaymentSchema])
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

export const ContractSchema = SchemaFactory.createForClass(Contract);

ContractSchema.pre<ContractDocument>('validate', function(next) {
    this.model('Contract').findOne({
      $or: [
        { $and: [ { fromDate: { $lte: this.fromDate } }, { tillDate: { $gte: this.fromDate } } ] },
        { $and: [ { tillDate: { $gte: this.tillDate } }, { fromDate: { $lte: this.fromDate } } ] }
      ]
    }).then(contract => {
      contract ? next(
        new HttpException(
          'There is already a contract within these dates!',
          HttpStatus.CONFLICT
        )
      ) : next();
    });
});
