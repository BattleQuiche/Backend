import { Module } from '@nestjs/common';
import { PartyController } from './party.controller';
import { PartyService } from './party.service';
import { MongooseModule } from '../mongoose.module';
import { ActionService } from './action.service';
import { NotificationService } from '../notification/notification.service';

@Module({
  imports: [MongooseModule],
  controllers: [PartyController],
  providers: [PartyService, ActionService, NotificationService],
})
export class PartyModule {}
