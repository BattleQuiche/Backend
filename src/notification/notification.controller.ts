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

  @Post('test-notif')
  async sendTestNotification(@Body() body) {
    console.log('New notif request with body: ', body);

    await this.applicationService.sendNotification({
      userId: body.userId,
      title: 'Backend notification test',
      message:
        "Ceci est un test de notification retournée pour signaler que l'utilisateur est bien enregistré au stream des notifs",
    });
    return 'notification send successfully';
  }
}
