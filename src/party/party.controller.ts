import { Controller, Put } from '@nestjs/common';
import { PartyService } from './party.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Party')
@Controller('party')
export class PartyController {
  constructor(private readonly partyService: PartyService) {}

  @Put()
  createNewParty() {
    return this.partyService.createNewParty();
  }
}
