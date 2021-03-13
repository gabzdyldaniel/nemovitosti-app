import { Injectable } from '@nestjs/common';
import { RealEstateAgency, RealEstateAgencyDocument } from './real-estate-agency.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from } from 'rxjs';


@Injectable()
export class RealEstateAgencyService {
  constructor(
    @InjectModel('RealEstateAgency') private readonly model: Model<RealEstateAgencyDocument>
  ) {
  }

  listAction() {
    return from (
      this.model.find()
    )
  }

  createAction(realEstateAgency: RealEstateAgency) {
    return from(
      new this.model(realEstateAgency).save()
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
