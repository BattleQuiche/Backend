import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { PartyService } from './party.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
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

  @Get(':partyId/details')
  async getParty(@Param('partyId') partyId: string) {
    return this.partyService.getParty(partyId);
  }

  @Get(':partyId/players')
  async getPartyPlayers(@Param('partyId') partyId: string) {
    return this.partyService.getPartyPlayers(partyId);
  }

  @ApiOperation({
    summary: '(Do not use on Swagger, json data is too high)',
  })
  @Get('map')
  getMap() {
    return this.partyService.readMapFile();
  }

  @Get('movable-tiles')
  getMovableTiles() {
    return this.partyService.readMovableTilesFile();
  }
}
