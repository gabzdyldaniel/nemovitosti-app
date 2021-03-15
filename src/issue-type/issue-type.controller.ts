import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { IssueType } from './issue-type.schema';
import { IssueTypeService } from './issue-type.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';


@Controller('issue-types')
export class IssueTypeController {
  constructor(private _issueTypeService: IssueTypeService) {
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  listAction(
    @Req() req: any
  ) {
    return this._issueTypeService.listAction(req.user._id)
  }


  @Post()
  @UseGuards(JwtAuthGuard)
  createAction(
    @Body() issueType: IssueType,
    @Req() req: any
  ) {
    return this._issueTypeService.createAction(issueType, req.user._id)
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  updateAction(
    @Param('id') id: string,
    @Req() req: any,
    @Body() issueType: IssueType
  ) {
    return this._issueTypeService.updateAction(
      id, req.user._id, issueType
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
    return this._issueTypeService.deleteAction(
      id, req.user._id
    ).pipe(
      catchError(err => of({error: err.message}))
    )
  }

}
