import { Injectable } from '@nestjs/common';
import config from '../config';
import * as webpush from 'web-push';
import { NotificationSubscriptionRepository } from '../repositories/notification-subscription.repository';
import { SaveSubscriptionDto } from './save-subscription.dto';

@Injectable()
export class NotificationService {
  constructor(private readonly notificationSubscriptionRepository: NotificationSubscriptionRepository) {
    webpush.setVapidDetails(
      "mailto:test@test.com",
      config().notificationPubKey,
      config().notificationPrivateKey,
    );
  }
  getPublicKey = () => config().notificationPubKey;

  saveSubscription = ({endpoint, keys, userId}: SaveSubscriptionDto) =>
    this.notificationSubscriptionRepository.insert({ endpoint, auth: keys.auth, publicKey: keys.p256dh, userId });

  sendNotification = async ({ userId, message }: Record<string, string>) => {
    try {
      const notificationSubscriptions = await this.notificationSubscriptionRepository.findManyBy({userId})
      const notificationPromises = notificationSubscriptions
        .map(({ auth, publicKey, endpoint }) => ({ endpoint, keys: { auth, p256dh: publicKey }}))
        .map((notificationSubscription) => webpush.sendNotification(notificationSubscription, message))
      await Promise.all(notificationPromises)
    } catch (err) {
      console.log(err);
    }


  }

}
