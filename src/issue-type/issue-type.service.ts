import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from } from 'rxjs';
import { IssueType, IssueTypeDocument } from './issue-type.schema';
import { switchMap } from 'rxjs/operators';


@Injectable()
export class IssueTypeService {
  constructor(
    @InjectModel('IssueType') private readonly model: Model<IssueTypeDocument>
  ) {
  }

  listAction(userId: string) {
    return from (
      this.model.find({ownedBy: userId})
    )
  }

  createAction(issueType: IssueType, userId: string) {
    return from(
      new this.model({
        name: issueType.name,
        ownedBy: userId
      }).save()
    )
  }

  updateAction(id: string, userId: string, {name}) {
    return from(
      this.model.findOne({_id: id, ownedBy: userId})
    ).pipe(
      switchMap(issueType => {
        if (!issueType) {
          throw new NotFoundException(
            `Issue type with ID: ${id} does not exist or does not belong to you`,
          );
        }

        return from(
          this.model.findOneAndUpdate({_id: id, ownedBy: userId}, {name})
        )
      })
    );
  }

  deleteAction(id: string, userId: string) {
    return from(
      this.model.findOne({_id: id, ownedBy: userId})
    ).pipe(
      switchMap(issueType => {
        if (!issueType) {
          throw new NotFoundException(
            `Issue type with ID: ${id} does not exist or does not belong to you`
          );
        }

        return from(
          this.model.findByIdAndDelete({_id: id, ownedBy: userId})
        )
      })
    );
  }
}
