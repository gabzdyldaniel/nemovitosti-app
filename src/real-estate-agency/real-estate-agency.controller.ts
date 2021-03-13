import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { RealEstateAgencyService } from './real-estate-agency.service';
import { RealEstateAgency } from './real-estate-agency.schema';
import { JwtAuthGuard } from '../auth/guards/auth.guard';


@Controller('real-estate-agencies')
export class RealEstateAgencyController {
  constructor(private _realEstateAgencyService: RealEstateAgencyService) {
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  listAction() {
    return this._realEstateAgencyService.listAction()
  }


  @Post()
  @UseGuards(JwtAuthGuard)
  createAction(
    @Body() realEstateAgency: RealEstateAgency
  ) {
    return this._realEstateAgencyService.createAction(realEstateAgency)
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  updateAction(
    @Param('id') id: string,
    @Body() realEstateAgency: RealEstateAgency
  ) {
    return this._realEstateAgencyService.updateAction(id, realEstateAgency)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deleteAction(
    @Param('id') id: string,
  ) {
    return this._realEstateAgencyService.deleteAction(id)
  }

}
