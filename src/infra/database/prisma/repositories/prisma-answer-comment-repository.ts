import { PaginationParams } from '@/core/repository/pagination-params'
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comment-repository'
import { AnswerComment } from '@/domain/forum/interprise/entities/answer-comment'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaAnswerCommentRepository implements AnswerCommentsRepository {
  findById(id: string): Promise<AnswerComment | null> {
    throw new Error('')
  }

  findManyByAnswerId(
    answerId: string,
    params: PaginationParams,
  ): Promise<AnswerComment[]> {
    throw new Error('')
  }

  create(answerComment: AnswerComment): Promise<void> {
    throw new Error('')
  }

  delete(answerComment: AnswerComment): Promise<void> {
    throw new Error('')
  }
}
