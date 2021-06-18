import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { StringOrObj, NotEmpty } from '@utils/class-validator/validators';

export class SendMessageRequestDto {
  @ApiProperty({
    type: 'string',
    required: true,
    description: 'Exemplo:5596991215506',
  })
  @IsNotEmpty()
  @IsString()
  to: string;

  @ApiProperty({
    type: 'string',
    required: false,
    description: 'Exemplo: descrição do arquivo',
  })
  @IsOptional()
  @IsString()
  subtitle?: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: true,
    description: 'Exemplo:Uma mensagem de texto ou um caminho de um arquivo ',
  })
  @NotEmpty()
  @StringOrObj()
  message: Express.Multer.File | string;
}
