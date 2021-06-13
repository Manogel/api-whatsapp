import { BadGatewayException, Injectable } from '@nestjs/common';
import { WhatsappService } from '@providers/whatsapp/whatsapp.service';
import { CONTACT_EXISTS } from './contact.errors';
import { ContactRepository } from './contact.repository';
import { CreateContactDto } from './dtos/CreateContact.dto';

@Injectable()
export class ContactService {
  constructor(
    private readonly whatsAppService: WhatsappService,
    private readonly contactRepo: ContactRepository,
  ) {}

  async getAllContacts() {
    const contacts = await this.contactRepo.findAll();
    return contacts;
  }

  async createContact(data: CreateContactDto) {
    const ifExists = await this.contactRepo.findOne({
      where: {
        number: data.number,
      },
    });

    if (ifExists) throw new BadGatewayException(CONTACT_EXISTS);

    const contacts = await this.contactRepo.createOne(data);
    return contacts;
  }

  async getContact(phoneNumber: string) {
    const contact = await this.whatsAppService.getContact(phoneNumber);
    return contact;
  }
}
