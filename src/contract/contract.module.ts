import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { ContractSchema } from './contract.schema';
import { ContractController } from './contract.controller';
import { ContractService } from './contract.service';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: 'Contract',
          schema: ContractSchema
        },
      ]
    ),
    AuthModule
  ],
  controllers: [ContractController],
  providers: [ContractService],
  exports: [ContractService]
})
export class ContractModule {}
