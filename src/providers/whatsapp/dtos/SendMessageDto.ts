import { IsString, IsOptional } from 'class-validator';

class SendMessageDto {
  @IsString()
  to: string;
}

export class SendMessageTextDto extends SendMessageDto {
  @IsString()
  message: string;
}

export class SendMessageFileDto extends SendMessageDto {
  @IsString()
  base64: string;

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
