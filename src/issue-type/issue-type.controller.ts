import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { IssueType } from './issue-type.schema';
import { IssueTypeService } from './issue-type.service';


@Controller('issue-types')
export class IssueTypeController {
  constructor(private _issueTypeService: IssueTypeService) {
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  listAction() {
    return this._issueTypeService.listAction()
  }


  @Post()
  @UseGuards(JwtAuthGuard)
  createAction(
    @Body() city: IssueType
  ) {
    return this._issueTypeService.createAction(city)
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  updateAction(
    @Param('id') id: string,
    @Body() city: IssueType
  ) {
    return this._issueTypeService.updateAction(id, city)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deleteAction(
    @Param('id') id: string,
    @Body() city: IssueType
  ) {
    return this._issueTypeService.deleteAction(id)
  }

}
