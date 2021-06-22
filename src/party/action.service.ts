import { Injectable, NotFoundException } from '@nestjs/common';
import { AddActionDTO } from './dto/add-action.dto';
import { ActionRepository } from '../repositories/action.repository';
import { UserRepository } from '../repositories/user.repository';
import { PartyRepository } from '../repositories/party.repository';
import { User } from '../models/user.model';
import { Party } from '../models/party.model';
import { ActionType } from '../models/action.model';
import * as MAP from '../json/map.json';
import * as MovableTiles from '../json/movable-tiles.json';

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

    await this.actionRepository.insert(dto);

    if ([ActionType.MOVE, ActionType.POP].includes(dto.actionType)) {
      await this.userRepository.updateOneBy(
        { _id: userInDB._id },
        { x: dto.toX, y: dto.toY },
      );
    }
  };

}
