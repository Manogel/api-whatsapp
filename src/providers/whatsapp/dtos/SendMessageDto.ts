import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

class SendMessageDto {
  @IsNotEmpty()
  @IsString()
  to: string;
}

export class SendMessageTextDto extends SendMessageDto {
  @IsNotEmpty()
  @IsString()
  message: string;
}

export class SendMessageFileDto extends SendMessageDto {
  @IsNotEmpty()
  @IsString()
  path: string;

  @IsString()
  filename: string;
}

export class SendMessageVoiceDto extends SendMessageFileDto {}

export class SendMessageVideoAsGifDto extends SendMessageFileDto {
  @IsString()
  subtitle: string;
}

export class SendMessageImageDto extends SendMessageFileDto {
  @IsOptional()
  @IsString()
  subtitle?: string;
}

export class SendFileDocumentDto extends SendMessageFileDto {
  @IsOptional()
  @IsString()
  subtitle?: string;
}
