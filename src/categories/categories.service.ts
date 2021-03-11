import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from '../auth/services/auth.service';
import { Category, CategoryDocument } from './category.schema';
import { from } from 'rxjs';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Category') private readonly model: Model<CategoryDocument>,
    private _authService: AuthService,
  ) {
  }

  createAction(category: Category) {
    return from(new this.model(category).save());
  }
}
