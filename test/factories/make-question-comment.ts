import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  QuestionComentProps,
  QuestionComment,
} from '@/domain/forum/interprise/entities/question-comment'
import { PrismaQuestionCommentMapper } from '@/infra/database/prisma/mappers/prisma-question-comment-mapper'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'

export function makeQuestionComment(
  override: Partial<QuestionComentProps> = {},
  id?: UniqueEntityID,
) {
  const questionComment = QuestionComment.create(
    {
      authorId: new UniqueEntityID(),
      content: faker.lorem.text(),
      questionId: new UniqueEntityID(),
      ...override,
    },
    id,
  )

  return questionComment
}

@Injectable()
export class QuesitonCommentFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaQuesitonComment(
    data: Partial<QuestionComentProps> = {},
  ): Promise<QuestionComment> {
    const comment = makeQuestionComment(data)

    await this.prisma.comment.create({
      data: PrismaQuestionCommentMapper.toPrisma(comment),
    })

    return comment
  }
}
