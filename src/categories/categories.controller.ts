import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { Category } from './category.schema';

@Controller('categories')
export class CategoriesController {
  constructor(private _categoriesService: CategoriesService) {
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  createAction(
    @Body() category: Category,
  ) {
    return this._categoriesService.createAction(category);
  }
}
