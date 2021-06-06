import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendMessageRequestDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: 'string',
    format: 'json',
    required: true,
    description: 'Exemplo:5596991215506',
  })
  to: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: 'string',
    format: 'json',
    required: false,
    description: 'Exemplo: descrição do arquivo',
  })
  subtitle?: string;

  @IsNotEmpty()
  @ApiProperty({
    type: 'formData',
    format: 'multipart/form-data',
    required: true,
    description: 'Exemplo:Uma mensagem de texto ou um caminho de um arquivo ',
  })
  message: Express.Multer.File | string;
}
