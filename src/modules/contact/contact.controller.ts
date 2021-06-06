import { Controller, Get, Param } from '@nestjs/common';
import { ContactService } from './contact.service';

@Controller('contacts')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get()
  async getAllContacts() {
    const data = await this.contactService.getAllContacts();
    return data;
  }
  @Get(':contactNumber')
  async getContact(@Param('contactNumber') contact: string) {
    const data = await this.contactService.getContact(contact);
    return data;
  }
}
