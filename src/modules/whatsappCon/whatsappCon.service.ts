import { Injectable } from '@nestjs/common';
import { WhatsappService } from '../../providers/whatsapp/whatsapp.service';

@Injectable()
export class WhatsappConService {
  constructor(private readonly whatsappService: WhatsappService) {}

  async getStatus() {
    const status = await this.whatsappService.showStatus();
    return status;
  }
}
