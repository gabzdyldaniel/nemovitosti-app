import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { ContractSchema } from './contract.schema';
import { ContractController } from './contract.controller';
import { ContractService } from './contract.service';
import { PaymentSchema } from '../payment/payment.schema';
import { PropertySchema } from '../property/property.schema';
import { PropertyModule } from '../property/property.module';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: 'Contract',
          schema: ContractSchema
        },
        {
          name: 'Property',
          schema: PropertySchema
        }
      ]
    ),
    AuthModule,
  ],
  controllers: [ContractController],
  providers: [ContractService],
  exports: [ContractService]
})
export class ContractModule {}
