import { PaginationParams } from '@/core/repository/pagination-params'
import { AnswerRepository } from '@/domain/forum/application/repositories/answer-repository'
import { Answer } from '@/domain/forum/interprise/entities/answer'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaAnswerRepository implements AnswerRepository {
  findById(id: string): Promise<Answer | null> {
    throw new Error('')
  }

  findManyByQuestionId(
    questionsId: string,
    params: PaginationParams,
  ): Promise<Answer[]> {
    throw new Error('')
  }

  create(answer: Answer): Promise<void> {
    throw new Error('')
  }

  save(answer: Answer): Promise<void> {
    throw new Error('')
  }

  delete(answer: Answer): Promise<void> {
    throw new Error('')
  }
}
