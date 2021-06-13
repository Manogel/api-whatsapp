import { ApiProperty } from '@nestjs/swagger';
import BaseEntityDto from '@utils/EntityBase.dto';

export class ContactDto extends BaseEntityDto {
  @ApiProperty()
  name?: string;

  @ApiProperty({ readOnly: true })
  alternativeName?: string;

  @ApiProperty({ required: false })
  note?: string;

  @ApiProperty()
  number: string;

  @ApiProperty({ readOnly: true })
  lastMessageId?: string;

  @ApiProperty({ readOnly: true })
  isMyContact?: boolean;
}
