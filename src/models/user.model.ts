import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: false })
  x: number;

  @Prop({ required: false })
  y: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
