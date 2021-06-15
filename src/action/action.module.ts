import { Module } from '@nestjs/common';
import { ActionController } from './action.controller';
import { ActionService } from './action.service';
import { MongooseModule } from '../mongoose.module';

@Module({
  imports: [MongooseModule],
  controllers: [ActionController],
  providers: [ActionService],
})
export class ActionModule {}
