import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { Company } from './company.schema';
import { CompanyService } from './company.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';


@Controller('companies')
export class CompanyController {
  constructor(private _companyService: CompanyService) {
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  listAction(
    @Req() req: any
  ) {
    return this._companyService.listAction(req.user._id)
  }


  @Post()
  @UseGuards(JwtAuthGuard)
  createAction(
    @Body() company: Company,
    @Req() req: any
  ) {
    return this._companyService.createAction(company, req.user._id)
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  updateAction(
    @Param('id') id: string,
    @Req() req: any,
    @Body() company: Company
  ) {
    return this._companyService.updateAction(
      id, req.user._id, company
    ).pipe(
      catchError(err => of({error: err.message}))
    )
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deleteAction(
    @Param('id') id: string,
    @Req() req: any,
  ) {
    return this._companyService.deleteAction(
      id, req.user._id
    ).pipe(
      catchError(err => of({error: err.message}))
    )
  }

}
