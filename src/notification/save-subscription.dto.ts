import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SaveSubscriptionDto {
  @ApiProperty()
  @IsNotEmpty()
  endpoint: string;

  @ApiProperty()
  @IsNotEmpty()
  userId: string;

  @ApiProperty()
  @IsNotEmpty()
  keys: {
    p256dh: string,
    auth: string,
  };
}
