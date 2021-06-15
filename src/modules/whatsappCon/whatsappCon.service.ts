import { Injectable } from '@nestjs/common';
import { getAsyncAppConfig } from '@config/app';
import { WhatsappService } from '../../providers/whatsapp/whatsapp.service';

@Injectable()
export class WhatsappConService {
  constructor(private readonly whatsappService: WhatsappService) {}
  appConfig = getAsyncAppConfig();
  async getStatus() {
    const status = await this.whatsappService.showStatus();
    return status;
  }
}
