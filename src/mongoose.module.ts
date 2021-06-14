import { Module } from '@nestjs/common';
import { MongooseModule as NestMongooseModule } from '@nestjs/mongoose';
import { Party, PartySchema } from './models/party.model';
import { PartyRepository } from './repositories/party.repository';

@Module({
  imports: [
    NestMongooseModule.forFeature([{ name: Party.name, schema: PartySchema }]),
  ],
  providers: [PartyRepository],
  exports: [PartyRepository],
})
export class MongooseModule {}
