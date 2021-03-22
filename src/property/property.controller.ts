import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { Property } from './property.schema';
import { PropertyService } from './property.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';


@Controller('properties')
export class PropertyController {
  constructor(private _propertyService: PropertyService) {
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  listAction(
    @Req() req: any
  ) {
    return this._propertyService.listAction(req.user._id)
  }


  @Post()
  @UseGuards(JwtAuthGuard)
  createAction(
    @Body() property: Property,
    @Req() req: any
  ) {
    return this._propertyService.createAction(property, req.user._id)
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  updateAction(
    @Param('id') id: string,
    @Req() req: any,
    @Body() property: Property
  ) {
    return this._propertyService.updateAction(
      id, req.user._id, property
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
    return this._propertyService.deleteAction(
      id, req.user._id
    ).pipe(
      catchError(err => of({error: err.message}))
    )
  }
}
