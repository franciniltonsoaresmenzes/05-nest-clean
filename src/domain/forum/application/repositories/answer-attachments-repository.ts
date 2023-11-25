import { AnswerAttachments } from '../../interprise/entities/answer-attachment'

export abstract class AnswerAttachmentsRepository {
  abstract findManyByAnswerId: (
    answerId: string,
  ) => Promise<AnswerAttachments[]>

  abstract deleteManyByAnswerId: (answerId: string) => Promise<void>
}
