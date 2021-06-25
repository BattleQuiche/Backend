import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ActionDocument = Action & Document;

export enum ActionType {
  MOVE = 'MOVE',
  POP = 'POP',
  NEXT_ROUND = 'NEXT_ROUND',
}

@Schema()
export class Action {
  _id: Types.ObjectId;

  @Prop({ required: true })
  partyId: string;

  @Prop({ required: true })
  actionType: ActionType;

  @Prop({ required: false })
  fromX: number;

  @Prop({ required: false })
  fromY: number;

  @Prop({ required: false })
  toX: number;

  @Prop({ required: false })
  toY: number;

  @Prop({ required: true })
  date: number;
}

export const ActionSchema = SchemaFactory.createForClass(Action);
