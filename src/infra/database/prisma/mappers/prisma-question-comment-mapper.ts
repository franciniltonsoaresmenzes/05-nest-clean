import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { QuestionComment } from '@/domain/forum/interprise/entities/question-comment'
import { Prisma, Comment as PrismaQuestionComment } from '@prisma/client'

export class PrismaQuestionCommentMapper {
  static toDomain(raw: PrismaQuestionComment): QuestionComment {
    if (!raw.questionId) throw new Error('Invalid Comment type.')

    return QuestionComment.create(
      {
        content: raw.content,
        authorId: new UniqueEntityID(raw.authorId),
        questionId: new UniqueEntityID(raw.questionId),
        createdAd: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(answer: QuestionComment): Prisma.CommentUncheckedCreateInput {
    return {
      id: answer.id.toSring(),
      authorId: answer.authorId.toSring(),
      content: answer.content,
      createdAt: answer.createdAd,
      updatedAt: answer.updatedAt,
    }
  }
}
