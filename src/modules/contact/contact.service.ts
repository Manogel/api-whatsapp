import { Injectable } from '@nestjs/common';
import { Contacts } from './dto/contact.dto';
import { WhatsappService } from '../../providers/whatsapp/whatsapp.service';

@Injectable()
export class ContactService {
  constructor(private readonly whatsAppService: WhatsappService) {}

  async getAllContacts() {
    const response = await this.whatsAppService.getContactList();
    return response;
  }

  async getContact(contact: Contacts) {
    const response = await this.whatsAppService.getContact(contact);
    return response;
  }
}
