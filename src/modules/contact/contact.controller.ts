import { Controller, Get, Param } from '@nestjs/common';
import { ContactService } from './contact.service';

@Controller('contacts')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get()
  async getAllContacts() {
    const contacts = await this.contactService.getAllContacts();
    return contacts;
  }
  @Get(':contactNumber')
  async getContact(@Param('contactNumber') phoneNumber: string) {
    const contact = await this.contactService.getContact(phoneNumber);
    return contact;
  }
}
