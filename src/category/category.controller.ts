import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { Category } from './category.schema';

@Controller('categories')
export class CategoryController {
  constructor(private _categoryService: CategoryService) {
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  listAction() {
    return this._categoryService.listAction();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  createAction(
    @Body() category: Category,
  ) {
    return this._categoryService.createAction(category);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  updateAction(
    @Param('id') id: string,
    @Body() category: Category
  ) {
    this._categoryService.updateAction(id, category);
  }
}
