import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dtos/CreateContact.dto';

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

  @Post()
  @ApiOperation({ description: 'Cria um contato' })
  async createContact(@Body() data: CreateContactDto) {
    const contact = await this.contactService.createContact(data);
    return contact;
  }

  @Get(':contactNumber')
  @ApiOperation({ description: 'Encontra um contato pelo numero' })
  async getContact(@Param('contactNumber') phoneNumber: string) {
    const contact = await this.contactService.getContact(phoneNumber);
    return contact;
  }
}
