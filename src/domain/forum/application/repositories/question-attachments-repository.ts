import { QuestionAttachment } from '../../interprise/entities/question-attachment'

export interface QuestionAttachmentsRepository {
  findManyByQuestionId: (questionId: string) => Promise<QuestionAttachment[]>
  deleteManyByQuestionId: (questionId: string) => Promise<void>
}
