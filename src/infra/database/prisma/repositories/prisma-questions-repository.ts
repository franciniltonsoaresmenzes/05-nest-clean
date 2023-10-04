import { Injectable } from '@nestjs/common'
import { PaginationParams } from '@/core/repository/pagination-params'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '@/domain/forum/interprise/entities/question'
import { PrismaService } from '../prisma.service'
import { PrismaQuestionMapper } from '../mappers/prisma-question-mapper'

@Injectable()
export class PrismaQuestionsRepository implements QuestionsRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Question | null> {
    const question = await this.prisma.question.findUnique({
      where: {
        id,
      },
    })

    if (!question) return null

    return PrismaQuestionMapper.toDomain(question)
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
