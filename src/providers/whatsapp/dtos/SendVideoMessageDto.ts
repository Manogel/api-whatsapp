import { IsString } from 'class-validator';

export class SendVideoMessageDto {
  @IsString()
  to: string;

  @IsString()
  base64?: string;

  @IsString()
  filename?: string;

  @IsString()
  caption?: string;
}
