import { Injectable } from '@nestjs/common'
import { PaginationParams } from '@/core/repository/pagination-params'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '@/domain/forum/interprise/entities/question'

@Injectable()
export class PrismaQuestionsRepository implements QuestionsRepository {
  findById(id: string): Promise<Question | null> {
    throw new Error('')
  }

  findBySlug(slug: string): Promise<Question | null> {
    throw new Error('')
  }

  findManyRecent(params: PaginationParams): Promise<Question[]> {
    throw new Error('')
  }

  save(question: Question): Promise<void> {
    throw new Error('')
  }

  create(question: Question): Promise<void> {
    throw new Error('')
  }

  delete(question: Question): Promise<void> {
    throw new Error('')
  }
}
