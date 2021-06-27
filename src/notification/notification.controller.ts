import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NotificationService } from './notification.service';
import { SaveSubscriptionDto } from './save-subscription.dto';

@ApiTags('Notification Action')
@Controller('notification')
export class NotificationController {
  constructor(private readonly applicationService: NotificationService) {}

  @Get('public-key')
  getPublicKey() {
    return this.applicationService.getPublicKey();
  }

  @Post('save')
  async saveSubscription(@Body() body: SaveSubscriptionDto) {
    await this.applicationService.saveSubscription(body);
  }
}
