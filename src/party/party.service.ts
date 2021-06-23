import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PartyRepository } from '../repositories/party.repository';
import { PartyDocument } from '../models/party.model';
import { UserRepository } from '../repositories/user.repository';
import { AddPlayerDto } from './dto/add-user.dto';
import { ActionService } from './action.service';
import * as MAP from '../json/map.json';
import * as MovableTiles from '../json/movable-tiles.json';

@Injectable()
export class PartyService {
  constructor(
    private readonly partyRepository: PartyRepository,
    private readonly userRepository: UserRepository,
    private readonly actionService: ActionService,
  ) {}

  readMapFile = () => MAP;

  readMovableTilesFile = () => MovableTiles;

  getParty = (partyId: string) => this.partyRepository.findOneBy({ partyId });

  createNewParty = async () => {
    const parties = await this.partyRepository.findAllPArtyIds();
    const partyId = this.generateRandomPartyId(parties);

    return this.partyRepository.insert({ partyId });
  };

  addPlayerInParty = async (partyId: string, dto: AddPlayerDto) => {
    const user = await this.userRepository.findOneById(dto.userId);

    if (!user) {
      throw new NotFoundException(null, 'CANNOT_FIND_USER');
    }

    const party = await this.partyRepository.findOneBy({ partyId });

    if (!party) {
      throw new NotFoundException(null, 'CANNOT_FIND_PARTY');
    }

    const userWithSameId = party.users.find(
      (user) => user.userId === dto.userId,
    );
    if (!!userWithSameId) {
      return;
    }

    if (party.users.length >= 4) {
      throw new BadRequestException(null, 'MAX_4_PLAYERS');
    }

    const icons = [
      'player_icon_1',
      'player_icon_2',
      'player_icon_3',
      'player_icon_4',
    ].filter((icon) =>
      party.users
        .map((player) => player.icon === icon)
        .every((value) => !value),
    );

    const icon = icons[Math.floor(Math.random() * icons.length)];

    const result = await this.partyRepository.pushArray(
      { partyId },
      {
        users: [
          {
            userId: dto.userId,
            username: user.username,
            icon,
            x: null,
            y: null,
          },
        ],
      },
    );

    if (!result) {
      throw new BadRequestException();
    }

    await this.actionService.randomPop(party, user);
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
