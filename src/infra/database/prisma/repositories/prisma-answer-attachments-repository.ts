import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository'
import { AnswerAttachments } from '@/domain/forum/interprise/entities/answer-attachment'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismAnswerAttachmentsRepository
  implements AnswerAttachmentsRepository
{
  findManyByAnswerId(answerId: string): Promise<AnswerAttachments[]> {
    throw new Error('')
  }

  deleteManyByAnswerId(answerId: string): Promise<void> {
    throw new Error('')
  }
}
