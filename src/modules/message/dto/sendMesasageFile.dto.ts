import { IsString, IsNotEmpty } from 'class-validator';

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

  @IsString()
  subtitle: string;
}
