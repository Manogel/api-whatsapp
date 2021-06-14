import { PickType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { ContactDto } from './Contact.dto';

const keys: readonly (keyof ContactDto)[] = ['name', 'number'];

export class CreateContactDto extends PickType(ContactDto, keys) {
  @ApiProperty()
  name: string;

  @ApiProperty()
  number: string;
}
