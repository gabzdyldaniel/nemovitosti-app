import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { IssueType } from '../issue-type/issue-type.schema';
import { Company } from '../company/company.schema';

@Schema({ toJSON: { getters: true } })
export class Issue {
  _id: mongoose.Types.ObjectId;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'IssueType', autopopulate: true })
  issueType: IssueType;

  @Prop({ required: true })
  description: string;

  @Prop({ default: Date.now })
  created: number;

  @Prop()
  repairDate: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Company', autopopulate: true })
  company: Company;

  @Prop()
  price: number;

  @Prop({
    get: function() {
      const now = Date.now();
      return !!this.repairDate && (now >= this.repairDate.getTime());
    }
  })
  solved: boolean;
}

export const IssueSchema = SchemaFactory.createForClass(Issue);
