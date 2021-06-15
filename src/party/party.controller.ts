import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { PartyService } from './party.service';
import { ApiTags } from '@nestjs/swagger';
import { AddPlayerDto } from './add-user.dto';

@ApiTags('Party')
@Controller('party')
export class PartyController {
  constructor(private readonly partyService: PartyService) {}

  @Put()
  createNewParty() {
    return this.partyService.createNewParty();
  }

  @Post(':partyId/add-player')
  async addPlayer(
    @Param('partyId') partyId: string,
    @Body() user: AddPlayerDto,
  ) {
    await this.partyService.addPlayerInParty(partyId, user);
  }
}
