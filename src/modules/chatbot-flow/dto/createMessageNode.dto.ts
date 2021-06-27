import { PickType } from '@nestjs/swagger';
import { CreateChatbotFlowDto } from './createChatbotFlow.dto';

const pickFields: (keyof CreateChatbotFlowDto)[] = [
  'id',
  'title',
  'message',
  'isEntryFlow',
  'isFinalFlow',
  'extendsData',
];

export class CreateMessageNodeDto extends PickType(
  CreateChatbotFlowDto,
  pickFields,
) {}
