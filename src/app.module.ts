import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://dbUser:WxjTWkgc2NtPscEn@cluster0.fscln.mongodb.net/Cluster0?retryWrites=true&w=majority',
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false,
      },
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
