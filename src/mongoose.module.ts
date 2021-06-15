import { Module } from '@nestjs/common';
import { MongooseModule as NestMongooseModule } from '@nestjs/mongoose';
import { Party, PartySchema } from './models/party.model';
import { PartyRepository } from './repositories/party.repository';
import { User, UserSchema } from './models/user.model';
import { UserRepository } from './repositories/user.repository';
import * as mongoose from 'mongoose';

mongoose.set('useCreateIndex', true);

@Module({
  imports: [
    NestMongooseModule.forFeature([{ name: Party.name, schema: PartySchema }]),
    NestMongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [PartyRepository, UserRepository],
  exports: [PartyRepository, UserRepository],
})
export class MongooseModule {}
