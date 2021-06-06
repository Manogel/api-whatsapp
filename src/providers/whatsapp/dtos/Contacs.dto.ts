import { IsString, IsNotEmpty } from 'class-validator';

export class Contacts {
  @IsNotEmpty()
  @IsString()
  contactNumber: string;
}
