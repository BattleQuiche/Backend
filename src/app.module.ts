import { Module } from '@nestjs/common';
import { PartyModule } from './party/party.module';
import { MongooseModule } from './mongoose.module';
import { MongooseModule as NestJSMongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import config from './config';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    PartyModule,
    MongooseModule,
    NestJSMongooseModule.forRoot(config().mongoUrl),
    UserModule,
    ActionModule,
    NotificationModule,
  ],
})
export class AppModule {}
