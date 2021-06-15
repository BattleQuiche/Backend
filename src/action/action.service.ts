import { Injectable, NotFoundException } from '@nestjs/common';
import { AddActionDTO } from './add-action.dto';
import { ActionRepository } from '../repositories/action.repository';
import { UserRepository } from '../repositories/user.repository';
import { PartyRepository } from '../repositories/party.repository';
import MAP from '../map.json';

@Injectable()
export class ActionService {
  constructor(
    private readonly actionRepository: ActionRepository,
    private readonly userRepository: UserRepository,
    private readonly partyRepository: PartyRepository,
  ) {}

  addAction = async (dto: AddActionDTO) => {
    const userInDB = await this.userRepository.findOneById(dto.userId);

    if (!userInDB) {
      throw new NotFoundException(null, 'CANNOT_FIND_USER');
    }

    const party = await this.partyRepository.findOneBy({
      partyId: dto.partyId,
    });

    if (!party) {
      throw new NotFoundException(null, 'CANNOT_FIND_PARTY');
    }

    return this.actionRepository.insert(dto);
  };
}
