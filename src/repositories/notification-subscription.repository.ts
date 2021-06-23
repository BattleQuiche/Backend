import { Injectable } from '@nestjs/common';
import BaseRepository from './base.repository';
import { NotificationSubscription, NotificationSubscriptionDocument } from '../models/notification-subscription.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class NotificationSubscriptionRepository extends BaseRepository<NotificationSubscriptionDocument> {
  constructor(@InjectModel(NotificationSubscription.name) private model: Model<NotificationSubscriptionDocument>) {
    super(model);
  }
}
