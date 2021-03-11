import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RealEstateAgencySchema } from './real-estate-agency.schema';
import { RealEstateAgencyController } from './real-estate-agency.controller';
import { RealEstateAgencyService } from './real-estate-agency.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: 'RealEstateAgency',
          schema: RealEstateAgencySchema
        },
      ]
    ),
    AuthModule
  ],
  controllers: [RealEstateAgencyController],
  providers: [RealEstateAgencyService],
  exports: [RealEstateAgencyService]
})
export class RealEstateAgencyModule {}
