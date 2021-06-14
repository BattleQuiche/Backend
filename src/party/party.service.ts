import { Injectable } from '@nestjs/common';
import { PartyRepository } from '../repositories/party.repository';
import { Party, PartyDocument } from '../models/party.model';

@Injectable()
export class PartyService {
  constructor(private readonly partyRepository: PartyRepository) {}

  createNewParty = async () => {
    const parties = await this.partyRepository.findAllPArtyIds();
    const partyId = this.generateRandomPartyId(parties);

    return this.partyRepository.insert({ partyId });
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
