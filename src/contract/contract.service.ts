import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contract, ContractDocument } from './contract.schema';
import { from } from 'rxjs';

@Injectable()
export class ContractService {
  constructor(
    @InjectModel('Contract') private readonly model: Model<ContractDocument>
  ) {
  }

  createAction(contract: Contract) {
    return from(
      new this.model(contract).save()
    )
  }
}
