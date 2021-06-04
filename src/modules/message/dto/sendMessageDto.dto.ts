import { IsString, IsNotEmpty } from 'class-validator';

export class SendMessageDto {
  @IsString()
  to: string;

  @IsNotEmpty()
  message: Express.Multer.File | string;
}
