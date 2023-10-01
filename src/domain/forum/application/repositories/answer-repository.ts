import { PaginationParams } from '@/core/repository/pagination-params'
import { Answer } from '../../interprise/entities/answer'

export interface AnswerRepository {
  findById: (id: string) => Promise<Answer | null>
  findManyByQuestionId: (
    questionsId: string,
    params: PaginationParams,
  ) => Promise<Answer[]>
  create: (answer: Answer) => Promise<void>
  save: (answer: Answer) => Promise<void>
  delete: (answer: Answer) => Promise<void>
}
