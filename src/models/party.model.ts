import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PartyDocument = Party & Document;

@Schema()
export class Party {
  _id: Types.ObjectId;

  @Prop({ required: true, default: [] })
  users: [string];

  @Prop({ required: true, unique: true })
  partyId: string;
}

export const PartySchema = SchemaFactory.createForClass(Party);
