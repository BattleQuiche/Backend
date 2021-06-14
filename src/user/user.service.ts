import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto } from './creater-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  createNewUser = (body: CreateUserDto) =>
    this.userRepository.insert({ username: body.username });
}
