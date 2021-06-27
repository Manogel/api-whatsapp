import { PickType } from '@nestjs/swagger';
import { CreateChatbotFlowDto } from './createChatbotFlow.dto';

const pickFields: (keyof CreateChatbotFlowDto)[] = [
  'id',
  'target',
  'source',
  'mustBeEqualTo',
  'customMessageIfAnswerIsInvalid',
  'messageIfAnswerIsInvalidId',
  'extendsData',
];

export class CreateOrUpdateConnectionNodeDto extends PickType(
  CreateChatbotFlowDto,
  pickFields,
) {}
