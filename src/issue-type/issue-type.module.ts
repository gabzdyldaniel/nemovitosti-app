import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { IssueTypeSchema } from './issue-type.schema';
import { IssueTypeController } from './issue-type.controller';
import { IssueTypeService } from './issue-type.service';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: 'IssueType',
          schema: IssueTypeSchema
        },
      ]
    ),
    AuthModule
  ],
  controllers: [IssueTypeController],
  providers: [IssueTypeService],
  exports: [IssueTypeService]
})
export class IssueTypeModule {}
