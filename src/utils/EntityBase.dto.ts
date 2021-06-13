import { ApiProperty } from '@nestjs/swagger';

export default class BaseEntityDto {
  @ApiProperty({ readOnly: true })
  id: string;

  @ApiProperty({ readOnly: true })
  createdAt: Date;

  @ApiProperty({ readOnly: true })
  updatedAt: Date;

  @ApiProperty({ readOnly: true })
  deletedAt: Date;
}
