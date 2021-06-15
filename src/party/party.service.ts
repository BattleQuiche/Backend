import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PartyRepository } from '../repositories/party.repository';
import { PartyDocument } from '../models/party.model';
import { UserRepository } from '../repositories/user.repository';
import { AddPlayerDto } from './add-user.dto';

import * as MAP from '../map.json';

@Injectable()
export class PartyService {
  constructor(
    private readonly partyRepository: PartyRepository,
    private readonly userRepository: UserRepository,
  ) {}

  getPartyPlayers = async (partyId: string) => {
    const party = await this.partyRepository.findOneBy({ partyId });

    if (!party) {
      throw new NotFoundException(null, 'CANNOT_FIND_PARTY');
    }

    return this.userRepository.findManyBy({ _id: party.users });
  };

  readMapFile = () => MAP;

  getParty = (partyId: string) => this.partyRepository.findOneBy({ partyId });

  createNewParty = async () => {
    const parties = await this.partyRepository.findAllPArtyIds();
    const partyId = this.generateRandomPartyId(parties);

    return this.partyRepository.insert({ partyId });
  };

  addPlayerInParty = async (partyId: string, dto: AddPlayerDto) => {
    const userInDB = await this.userRepository.findOneById(dto.userId);

    if (!userInDB) {
      throw new NotFoundException(null, 'CANNOT_FIND_USER');
    }

    const party = await this.partyRepository.findOneBy({ partyId });

    if (!party) {
      throw new NotFoundException(null, 'CANNOT_FIND_PARTY');
    }

    if (party.users.length >= 4) {
      throw new BadRequestException(null, 'MAX_4_PLAYERS');
    }

    if (party.users.includes(dto.userId)) {
      return;
    }

    const result = await this.partyRepository.pushArray(
      { partyId },
      { users: [dto.userId] },
    );

    if (!result) {
      throw new BadRequestException();
    }
  };

  private generateRandomPartyId = (parties: PartyDocument[]): string => {
    const chars = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];

    const partyId = [...Array(6)]
      .map(() => chars[(Math.random() * chars.length) | 0])
      .join('');

    return parties.some((party) => party.partyId === partyId)
      ? this.generateRandomPartyId(parties)
      : partyId;
  };
}
