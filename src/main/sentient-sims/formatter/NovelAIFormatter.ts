/* eslint-disable class-methods-use-this */
import {
  ClassificationRequest,
  PromptRequest2,
} from '../models/OpenAIRequestBuilder';
import { filterNullAndUndefined } from '../util/filter';
import { InputFormatter } from './InputOutputFormatting';

export class NovelAIFormatter implements InputFormatter {
  formatInput(promptRequest: PromptRequest2): PromptRequest2 {
    if (promptRequest.action) {
      promptRequest.action = filterNullAndUndefined([
        promptRequest.prePreAction,
        `{${promptRequest.action}}`,
      ]).join(' ');
    }

    if (
      promptRequest.preAssistantPreResponse ||
      promptRequest.assistantPreResponse
    ) {
      promptRequest.assistantPreResponse = filterNullAndUndefined([
        promptRequest.preAssistantPreResponse,
        promptRequest.assistantPreResponse,
      ]).join(' ');
    }

    promptRequest.memories.forEach((memory) => {
      if (memory.role === 'assistant') {
        memory.content = `${memory.content}`;
      }
      if (memory.role === 'user') {
        memory.content = `{${memory.content}}`;
      }
    });

    return promptRequest;
  }

  formatClassification(
    classificationRequest: ClassificationRequest
  ): ClassificationRequest {
    return classificationRequest;
  }
}
