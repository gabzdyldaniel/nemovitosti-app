import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CategoriesModule } from './categories/categories.module';
import { CityModule } from './city/city.module';

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

    // Categories
    CategoriesModule,
    // Cities
    CityModule,
    // Users
    UsersModule,
    // Auth
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
