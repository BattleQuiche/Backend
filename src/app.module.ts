import { Module } from '@nestjs/common';
import { PartyModule } from './party/party.module';
import { MongooseModule } from './mongoose.module';
import { MongooseModule as NestJSMongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ActionModule } from './action/action.module';
import config from './config';

@Module({
  imports: [
    PartyModule,
    MongooseModule,
    NestJSMongooseModule.forRoot(config().mongoUrl),
    UserModule,
    ActionModule,
  ],
})
export class AppModule {}
