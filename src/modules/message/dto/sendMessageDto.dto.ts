import { IsString, IsNotEmpty } from 'class-validator';

export class SendMessageDto {
  @IsString()
  @IsNotEmpty()
  to: string;

  @IsNotEmpty()
  message: Express.Multer.File | string;
}
