import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from } from 'rxjs';
import { Property, PropertyDocument } from './property.schema';
import { switchMap } from 'rxjs/operators';


@Injectable()
export class PropertyService {
  constructor(
    @InjectModel('Property') private readonly model: Model<PropertyDocument>
  ) {
  }

  listAction(userId: string) {
    return from (
      this.model.find({ownedBy: userId})
    )
  }

  createAction({ contracts, ...property }: Property, userId: string) {
    return from(
      new this.model({
        ...property,
        ownedBy: userId
      }).save()
    )
  }

  updateAction(id: string, userId: string, { contracts, ...property }: Property) {
    return from(
      this.model.findOne({_id: id, ownedBy: userId})
    ).pipe(
      switchMap(prop => {
        if (!prop) {
          throw new NotFoundException(
            `Property with ID: ${id} does not exist or does not belong to you`,
          );
        }

        return from(
          this.model.findOneAndUpdate({_id: id, ownedBy: userId}, property)
        )
      })
    );
  }

  deleteAction(id: string, userId: string) {
    return from(
      this.model.findOne({_id: id, ownedBy: userId})
    ).pipe(
      switchMap(property => {
        if (!property) {
          throw new NotFoundException(
            `Property with ID: ${id} does not exist or does not belong to you`
          );
        }

        return from(
          this.model.findByIdAndDelete({_id: id, ownedBy: userId})
        )
      })
    );
  }
}
