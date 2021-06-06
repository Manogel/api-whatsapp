import { Injectable } from '@nestjs/common';
import { WhatsappService } from '@providers/whatsapp/whatsapp.service';

@Injectable()
export class ContactService {
  constructor(private readonly whatsAppService: WhatsappService) {}

  async getAllContacts() {
    const contacts = await this.whatsAppService.getContactList();
    return contacts;
  }

  async getContact(phoneNumber: string) {
    const contact = await this.whatsAppService.getContact(phoneNumber);
    return contact;
  }
}
