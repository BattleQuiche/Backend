import { Module } from '@nestjs/common';
import { PartyModule } from './party/party.module';
import { MongooseModule } from './mongoose.module';
import { MongooseModule as NestJSMongooseModule } from '@nestjs/mongoose';
import config from './config';

@Module({
  imports: [
    PartyModule,
    MongooseModule,
    NestJSMongooseModule.forRoot(config().mongoUrl),
  ],
})
export class AppModule {}
