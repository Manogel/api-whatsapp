import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { WhatsappConService } from './whatsappCon.service';

@ApiTags('services')
@Controller('services')
export class WhatsappConController {
  constructor(private readonly whatsappConService: WhatsappConService) {}
  @Get()
  @ApiOperation({ description: 'Retorna o Status' })
  async getStatus() {
    const response = await this.whatsappConService.getStatus();
    return response;
  }
}
