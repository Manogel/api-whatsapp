import { IsString } from 'class-validator';

export class SendTextMessageDto {
  @IsString()
  to: string;

  @IsString()
  message: string;
}
