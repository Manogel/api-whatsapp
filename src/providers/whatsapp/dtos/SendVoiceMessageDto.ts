import { IsString } from 'class-validator';

export class SendVoiceMessageDto {
  @IsString()
  to: string;

  @IsString()
  base64: string;
}
