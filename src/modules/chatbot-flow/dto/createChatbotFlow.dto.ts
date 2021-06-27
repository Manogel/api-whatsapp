import { ApiProperty } from '@nestjs/swagger';

export enum INodeType {
  NODE = 'node',
  CONNECTION = 'connection',
}

export class CreateChatbotFlowDto {
  @ApiProperty({ enum: INodeType })
  type: INodeType;

  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  message: string;

  @ApiProperty()
  isEntryFlow: boolean;

  @ApiProperty()
  isFinalFlow: boolean;

  // for connection node
  @ApiProperty()
  source: string;

  @ApiProperty()
  target: string;

  @ApiProperty()
  mustBeEqualTo: string;

  @ApiProperty()
  messageIfAnswerIsInvalidId?: string;

  @ApiProperty()
  customMessageIfAnswerIsInvalid?: string;

  extendsData: any;
}
