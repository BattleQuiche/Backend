import { Body, Controller, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AddActionDTO } from './add-action.dto';
import { ActionService } from './action.service';

@ApiTags('Party Action')
@Controller('party/action')
export class ActionController {
  constructor(private readonly actionService: ActionService) {}

  @Put()
  addAction(@Body() body: AddActionDTO) {
    return this.actionService.addAction(body);
  }
}
