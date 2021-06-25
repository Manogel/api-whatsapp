import { IsString, IsNotEmpty, IsOptional, ValidateIf } from 'class-validator';

export class SendMessageRequestDto {
  @IsNotEmpty()
  @IsString()
  to: string;

  @ValidateIf((o) => !!o.url)
  @IsOptional()
  @IsString()
  text?: string;

  @ValidateIf((o) => !!o.text)
  @IsOptional()
  @IsString()
  url?: string;

  @ValidateIf((o) => !!o.text)
  @IsOptional()
  @IsString()
  caption?: string;
}
