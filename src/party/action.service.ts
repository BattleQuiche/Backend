import { Injectable, NotFoundException } from '@nestjs/common';
import { AddActionDTO } from './dto/add-action.dto';
import { ActionRepository } from '../repositories/action.repository';
import { UserRepository } from '../repositories/user.repository';
import { PartyRepository } from '../repositories/party.repository';
import { User } from '../models/user.model';
import { Party } from '../models/party.model';
import { ActionType, Action } from '../models/action.model';
import * as MAP from '../json/map.json';
import * as MovableTiles from '../json/movable-tiles.json';
import { NextRoundDto } from './dto/next-round.dto';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class ActionService {
  constructor(
    private readonly actionRepository: ActionRepository,
    private readonly userRepository: UserRepository,
    private readonly partyRepository: PartyRepository,
    private readonly notificationService: NotificationService,
  ) {}

  addAction = async (dto: AddActionDTO) => {
    const party = await this.partyRepository.findOneBy({
      partyId: dto.partyId,
    });

    if (!party) {
      throw new NotFoundException(null, 'CANNOT_FIND_PARTY');
    }

    await this.actionRepository.insert(dto);

    if ([ActionType.MOVE, ActionType.POP].includes(dto.actionType)) {
      await this.partyRepository.updateOneBy(
        { _id: party._id, 'users.userId': dto.userId },
        { 'users.$.x': dto.toX, 'users.$.y': dto.toY },
      );
    }
  };

  getActions = async (partyId: string) =>
    this.actionRepository
      .findManyBy({ partyId })
      .then((actions: Action[]) => actions.sort((a, b) => a.date - b.date));

  randomPop = async (party: Party, user: User) => {
    const layerMap = this.findLayerInMap('Map');
    const layerWater = this.findLayerInMap('Water');
    const layerSurObjects = this.findLayerInMap('SurObjects');
    const layerObjects = this.findLayerInMap('Objects');

    const availableCases = [...Array(MAP.width * MAP.height).keys()]
      .map((_, index) => [
        layerMap[index],
        layerWater[index],
        layerSurObjects[index],
        layerObjects[index],
      ])
      .map((values, index) => ({
        index,
        canMove: this.canMove(values),
      }))
      .filter((mapCase) => mapCase.canMove);

    const randomCaseIndex = Math.floor(Math.random() * availableCases.length);
    const randomCase = availableCases[randomCaseIndex];
    const { x, y } = this.caseIndexToXY(randomCase.index);

    await this.addAction({
      partyId: party.partyId,
      userId: String(user._id),
      actionType: ActionType.POP,
      date: Date.now(),
      fromX: null,
      fromY: null,
      toX: x,
      toY: y,
    });
  };

  getNextRound = async (dto: NextRoundDto) => {
    const user = await this.userRepository.findOneById(dto.userId);

    if (!user) {
      throw new NotFoundException(null, 'CANNOT_FIND_USER');
    }

    const party = await this.partyRepository.findOneBy({
      partyId: dto.partyId,
    });

    if (!party) {
      throw new NotFoundException(null, 'CANNOT_FIND_PARTY');
    }
    const players = [...party.users, ...party.users];

    const indexNext = players.findIndex(
      (player) => player.userId === dto.userId,
    );
    const nextPlayer = players[indexNext + 1];

    await this.notificationService.sendNotification({
      userId: nextPlayer.userId,
      title: "C'est à votre tour de jouer !",
      message:
        "Votre adversaire a fini son tour et c'est désormais à vous de jouer !",
    });

    await this.addAction({
      partyId: dto.partyId,
      userId: String(dto.userId),
      actionType: ActionType.NEXT_ROUND,
      date: Date.now(),
      fromX: null,
      fromY: null,
      toX: null,
      toY: null,
    });
  };
  //  Utils
  private caseIndexToXY = (caseIndex: number) => {
    const x = caseIndex % MAP.width;
    const y = (caseIndex - x) / MAP.width;

    return { x: x - 1, y: y - 1 };
  };

  private canMove = (tiles: number[]): boolean => {
    return tiles.every((item) => MovableTiles.includes(item));
  };

  private findLayerInMap = (layerName) => {
    return MAP.layers.find((layer) => layer.name === layerName)?.data;
  };
}
