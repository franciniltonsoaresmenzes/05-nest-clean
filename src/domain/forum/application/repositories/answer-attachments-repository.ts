import { AnswerAttachments } from '../../interprise/entities/answer-attachment'

export interface AnswerAttachmentsRepository {
  findManyByAnswerId: (answerId: string) => Promise<AnswerAttachments[]>
  deleteManyByAnswerId: (answerId: string) => Promise<void>
}
