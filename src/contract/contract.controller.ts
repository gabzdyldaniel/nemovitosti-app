import { Body, Controller, Post } from '@nestjs/common';
import { ContractService } from './contract.service';
import { Contract } from './contract.schema';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Controller('contracts')
export class ContractController {
  constructor(private _contractService: ContractService) {
  }

  @Post()
  createAction(
    @Body() contract: Contract
  ) {
    return this._contractService.createAction(contract).pipe(
      catchError(err => of({error: err.message}))
    );
  }
}

