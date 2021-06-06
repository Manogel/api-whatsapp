import { Controller, Get, Param, Res } from '@nestjs/common';
import { ContactService } from './contact.service';
import { Contacts } from './dto/contact.dto';

@Controller('contacts')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get()
  async getAllContacts(@Res() response) {
    const data = await this.contactService.getAllContacts();
    return response.status(200).send(data);
  }
  @Get(':contactNumber')
  async getContact(@Param() contact: Contacts, @Res() response) {
    const data = await this.contactService.getContact(contact);
    return response.status(200).send(data);
  }
}
