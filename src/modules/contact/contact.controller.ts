import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ContactService } from './contact.service';

@ApiTags('contacts')
@Controller('contacts')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get()
  @ApiOperation({ description: 'Lista contatos' })
  async getAllContacts() {
    const contacts = await this.contactService.getAllContacts();
    return contacts;
  }
  @Get(':contactNumber')
  @ApiOperation({ description: 'Encontra um contato pelo numero' })
  async getContact(@Param('contactNumber') phoneNumber: string) {
    const contact = await this.contactService.getContact(phoneNumber);
    return contact;
  }
}
