import { Module } from '@nestjs/common';
import { PartyController } from './party.controller';
import { PartyService } from './party.service';
import { MongooseModule } from '../mongoose.module';

@Module({
  imports: [MongooseModule],
  controllers: [PartyController],
  providers: [PartyService],
})
export class PartyModule {}
