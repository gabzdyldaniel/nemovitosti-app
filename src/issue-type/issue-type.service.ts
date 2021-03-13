import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from } from 'rxjs';
import { IssueType, IssueTypeDocument } from './issue-type.schema';


@Injectable()
export class IssueTypeService {
  constructor(
    @InjectModel('IssueType') private readonly model: Model<IssueTypeDocument>
  ) {
  }

  listAction() {
    return from (
      this.model.find()
    )
  }

  createAction(issueType: IssueType) {
    return from(
      new this.model(issueType).save()
    )
  }

  updateAction(id: string, {name}) {
    return from(
      this.model.findOneAndUpdate({_id: id}, {name})
    )
  }

  deleteAction(id: string) {
    return from(
      this.model.findByIdAndDelete({_id: id})
    )
  }
}
