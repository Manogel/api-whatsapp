import { Contact } from 'venom-bot';

export class ReturnContactsDto {
  data: Contact[];
  total: number;
  limit: number;
  skip: number;
  currentPage: number;
  lastPage: number;
  from: number;
  to: number;
}
