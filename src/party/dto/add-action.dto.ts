import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Types } from 'mongoose';
import { Prop } from '@nestjs/mongoose';
import { ActionType } from '../../models/action.model';

export class AddActionDTO {
  @ApiProperty()
  @IsNotEmpty()
  partyId: string;

  @ApiProperty()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ enum: ActionType, enumName: 'ActionType' })
  @IsNotEmpty()
  actionType: ActionType;

  @ApiProperty()
  @IsOptional()
  date: number;

  @ApiProperty({ required: false })
  @IsOptional()
  fromX: number;

  @ApiProperty({ required: false })
  @IsOptional()
  fromY: number;

  @ApiProperty({ required: false })
  @IsOptional()
  toX: number;

  @ApiProperty({ required: false })
  @IsOptional()
  toY: number;
}
