export class ReceiveMessageDto {
  id: string;
  fromId: string;
  quotedMessageId?: string;
  message: {
    isFromMe: boolean;
    text: string;
    timestamp: string;
    type: string;
    file?: {
      url: string;
      name: string;
      mimetype: string;
      publicFilename: string;
      subtitle?: string;
    };
  };
  from: {
    id: string;
    name: string;
    alternativeName?: string;
    number: string;
  };
}
