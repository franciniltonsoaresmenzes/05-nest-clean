import { PaginationParams } from '@/core/repository/pagination-params'
import { AnswerComment } from '../../interprise/entities/answer-comment'

export abstract class AnswerCommentsRepository {
  abstract findById: (id: string) => Promise<AnswerComment | null>
  abstract findManyByAnswerId: (
    answerId: string,
    params: PaginationParams,
  ) => Promise<AnswerComment[]>

  abstract create: (answerComment: AnswerComment) => Promise<void>

  abstract delete: (answerComment: AnswerComment) => Promise<void>
}
