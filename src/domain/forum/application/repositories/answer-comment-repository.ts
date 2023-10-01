import { PaginationParams } from '@/core/repository/pagination-params'
import { AnswerComment } from '../../interprise/entities/answer-comment'

export interface AnswerCommentsRepository {
  findById: (id: string) => Promise<AnswerComment | null>
  findManyByAnswerId: (
    answerId: string,
    params: PaginationParams,
  ) => Promise<AnswerComment[]>
  create: (answerComment: AnswerComment) => Promise<void>
  delete: (answerComment: AnswerComment) => Promise<void>
}
