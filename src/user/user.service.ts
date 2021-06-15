import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto } from './creater-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  createNewUser = async (body: CreateUserDto) => {
    const user = await this.userRepository.findOneBy({
      username: body.username,
    });

    if (!!user) {
      return user;
    }

    return this.userRepository.insert({ username: body.username });
  };
}
