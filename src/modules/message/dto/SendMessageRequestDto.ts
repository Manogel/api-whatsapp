import { IsString, IsNotEmpty } from 'class-validator';

export class SendMessageRequestDto {
  @IsNotEmpty()
  @IsString()
  to: string;

  @IsNotEmpty()
  message: Express.Multer.File | string;
}
