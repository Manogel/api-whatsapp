export class SendMessageDto {
  to: string;
  message: string | Record<string, any>;
}
