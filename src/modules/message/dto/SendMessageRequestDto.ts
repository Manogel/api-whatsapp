import { IsString, IsNotEmpty } from 'class-validator';

export class SendMessageRequestDto {
  @IsString()
  @IsNotEmpty()
  to: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}
