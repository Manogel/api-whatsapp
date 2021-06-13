import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class SendMessageFileDto {
  @IsNotEmpty()
  @IsString()
  to: string;

  @IsNotEmpty()
  @IsString()
  path: string;

  @IsNotEmpty()
  @IsString()
  filename: string;

  @IsOptional()
  @IsString()
  subtitle?: string = '';
}
