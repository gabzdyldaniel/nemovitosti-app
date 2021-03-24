import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { PropertyController } from './property.controller';
import { PropertyService } from './property.service';
import { PropertySchema } from './property.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: 'Property',
          schema: PropertySchema
        },
      ]
    ),
    AuthModule
  ],
  controllers: [PropertyController],
  providers: [PropertyService],
  exports: [PropertyService]
})
export class PropertyModule {}
