import { IsString, IsNotEmpty } from 'class-validator';

export class SendMessageFileDto {
  @IsString()
  @IsNotEmpty()
  to: string;

  @IsString()
  @IsNotEmpty()
  path: string;

  @IsString()
  @IsNotEmpty()
  filename: string;

  @IsString()
  subtitle: string;
}
