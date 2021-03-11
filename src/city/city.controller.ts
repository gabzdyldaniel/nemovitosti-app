import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CityService } from './city.service';
import { City } from './city.schema';
import { JwtAuthGuard } from '../auth/guards/auth.guard';


@Controller('cities')
export class CityController {
  constructor(private _cityService: CityService) {
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  listAction() {
    return this._cityService.listAction()
  }


  @Post()
  @UseGuards(JwtAuthGuard)
  createAction(
    @Body() city: City
  ) {
    return this._cityService.createAction(city)
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  updateAction(
    @Param('id') id: string,
    @Body() city: City
  ) {
    return this._cityService.updateAction(id, city)
  }
}
