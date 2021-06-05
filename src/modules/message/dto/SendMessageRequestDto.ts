import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class SendMessageRequestDto {
  @IsNotEmpty()
  @IsString()
  to: string;

  @IsOptional()
  @IsString()
  subtitle: string;

  @IsNotEmpty()
  message: Express.Multer.File | string;
}
