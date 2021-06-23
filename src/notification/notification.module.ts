import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { MongooseModule } from '../mongoose.module';

@Module({
  imports: [MongooseModule],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
