import { Injectable } from '@nestjs/common';
import { City, CityDocument } from './city.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from } from 'rxjs';


@Injectable()
export class CityService {
  constructor(
    @InjectModel('City') private readonly model: Model<CityDocument>
  ) {
  }

  listAction() {
    return from (
      this.model.find()
    )
  }

  createAction(city: City) {
    return from(
      new this.model(city).save()
    )
  }

  updateAction(id: string, {name}) {
    return from(
      this.model.findOneAndUpdate({_id: id}, {name})
    )
  }
}
