import { Injectable } from '@nestjs/common';
import BaseRepository from './base.repository';
import { Action, ActionDocument } from '../models/action.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ActionRepository extends BaseRepository<ActionDocument> {
  constructor(@InjectModel(Action.name) private model: Model<ActionDocument>) {
    super(model);
  }
}
