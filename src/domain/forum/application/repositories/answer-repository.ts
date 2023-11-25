import { PaginationParams } from '@/core/repository/pagination-params'
import { Answer } from '../../interprise/entities/answer'

export abstract class AnswerRepository {
  abstract findById: (id: string) => Promise<Answer | null>
  abstract findManyByQuestionId: (
    questionId: string,
    params: PaginationParams,
  ) => Promise<Answer[]>

  abstract create: (answer: Answer) => Promise<void>

  abstract save: (answer: Answer) => Promise<void>

  abstract delete: (answer: Answer) => Promise<void>
}
