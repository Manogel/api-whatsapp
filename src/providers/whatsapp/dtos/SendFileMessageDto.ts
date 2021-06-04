import { IsString } from 'class-validator';

export class SendFileMessageDto {
  @IsString()
  to: string;

  @IsString()
  base64?: string;

  @IsString()
  filename?: string;
}
