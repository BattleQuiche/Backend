import { Module } from '@nestjs/common';
import { MongooseModule as NestMongooseModule } from '@nestjs/mongoose';
import { Party, PartySchema } from './models/party.model';
import { PartyRepository } from './repositories/party.repository';
import { User, UserSchema } from './models/user.model';
import { UserRepository } from './repositories/user.repository';
import * as mongoose from 'mongoose';
import { Action, ActionSchema } from './models/action.model';
import { ActionRepository } from './repositories/action.repository';
import { NotificationSubscriptionRepository } from './repositories/notification-subscription.repository';
import { NotificationSubscription, NotificationSubscriptionSchema } from './models/notification-subscription.model';

mongoose.set('useCreateIndex', true);

const mongooseConfig = [
  { repository: UserRepository, model: User, schema: UserSchema },
  { repository: PartyRepository, model: Party, schema: PartySchema },
  { repository: ActionRepository, model: Action, schema: ActionSchema },
  { repository: NotificationSubscriptionRepository, model: NotificationSubscription, schema: NotificationSubscriptionSchema },
];

@Module({
  imports: mongooseConfig.map(({ model, schema }) =>
    NestMongooseModule.forFeature([{ name: model.name, schema: schema }]),
  ),
  providers: mongooseConfig.map(({ repository }) => repository),
  exports: mongooseConfig.map(({ repository }) => repository),
})
export class MongooseModule {}
