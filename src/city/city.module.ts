import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CitySchema } from './city.schema';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: 'City',
          schema: CitySchema
        },
      ]
    ),
    AuthModule
  ],
  controllers: [CityController],
  providers: [CityService],
  exports: [CityService]
})
export class CityModule {}
