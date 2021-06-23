import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type NotificationSubscriptionDocument = NotificationSubscription &
  Document;

@Schema()
export class NotificationSubscription {
  _id: Types.ObjectId;

  @Prop({ required: true })
  endpoint: string;

  @Prop({ required: true })
  publicKey: string;

  @Prop({ required: true })
  auth: string;

  @Prop({ required: true })
  userId: string;
}

export const NotificationSubscriptionSchema = SchemaFactory.createForClass(
  NotificationSubscription,
);
