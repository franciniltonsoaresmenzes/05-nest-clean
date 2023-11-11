import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswerComment } from '@/domain/forum/interprise/entities/answer-comment'
import { Prisma, Comment as PrismaAnswerComment } from '@prisma/client'

export class PrismaAnswerCommentMapper {
  static toDomain(raw: PrismaAnswerComment): AnswerComment {
    if (!raw.answerId) throw new Error('Invalid Comment type.')

    return AnswerComment.create(
      {
        content: raw.content,
        authorId: new UniqueEntityID(raw.authorId),
        answerId: new UniqueEntityID(raw.answerId),
        createdAd: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(answer: AnswerComment): Prisma.CommentUncheckedCreateInput {
    return {
      id: answer.id.toSring(),
      authorId: answer.authorId.toSring(),
      content: answer.content,
      createdAt: answer.createdAd,
      updatedAt: answer.updatedAt,
    }
  }
}
