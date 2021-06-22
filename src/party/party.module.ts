import { Module } from '@nestjs/common';
import { PartyController } from './party.controller';
import { PartyService } from './party.service';
import { MongooseModule } from '../mongoose.module';
import { ActionService } from './action.service';

@Module({
  imports: [MongooseModule],
  controllers: [PartyController],
  providers: [PartyService, ActionService],
})
export class PartyModule {}
