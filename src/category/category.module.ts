import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from './category.schema';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: 'Category',
          schema: CategorySchema
        },
      ]
    ),
    AuthModule
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService]
})
export class CategoryModule {}
