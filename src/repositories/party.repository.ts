import { Injectable } from '@nestjs/common';
import BaseRepository from './base.repository';
import { Party, PartyDocument } from '../models/party.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PartyRepository extends BaseRepository<PartyDocument> {
  constructor(@InjectModel(Party.name) private model: Model<PartyDocument>) {
    super(model);
  }

  findAllPArtyIds = () => {
    return this.Model.find({}).select(['partyId']);
  };
}
