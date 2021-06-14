import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '../mongoose.module';

@Module({
  imports: [MongooseModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
