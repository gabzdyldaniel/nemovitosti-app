import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './category/category.module';
import { CityModule } from './city/city.module';
import { RealEstateAgencyModule } from './real-estate-agency/real-estate-agency.module';
import { ContractModule } from './contract/contract.module';
import { IssueTypeModule } from './issue-type/issue-type.module';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      'mongodb+srv://dbUser:WxjTWkgc2NtPscEn@cluster0.fscln.mongodb.net/Cluster0?retryWrites=true&w=majority',
      {
        connectionFactory: (connection) => {
          connection.plugin(require('mongoose-autopopulate'));
          return connection;
        },
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false,
      },
    ),
    // Contracts
    ContractModule,
    // Companies
    CompanyModule,
    // Categories
    CategoryModule,
    // Cities
    CityModule,
    // Real Estate Agencies
    RealEstateAgencyModule,
    // Issue Types
    IssueTypeModule,
    // Users
    UserModule,
    // Auth
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
