import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from } from 'rxjs';
import { Company, CompanyDocument } from './company.schema';
import { switchMap } from 'rxjs/operators';


@Injectable()
export class CompanyService {
  constructor(
    @InjectModel('Company') private readonly model: Model<CompanyDocument>
  ) {
  }

  listAction(userId: string) {
    return from (
      this.model.find({ownedBy: userId})
    )
  }

  createAction(company: Company, userId: string) {
    return from(
      new this.model({
        name: company.name,
        ownedBy: userId
      }).save()
    )
  }

  updateAction(id: string, userId: string, {name}) {
    return from(
      this.model.findOne({_id: id, ownedBy: userId})
    ).pipe(
      switchMap(company => {
        if (!company) {
          throw new NotFoundException(
            `Company with ID: ${id} does not exist or does not belong to you`,
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
      switchMap(company => {
        if (!company) {
          throw new NotFoundException(
            `Company with ID: ${id} does not exist or does not belong to you`
          );
        }

        return from(
          this.model.findByIdAndDelete({_id: id, ownedBy: userId})
        )
      })
    );
  }
}
