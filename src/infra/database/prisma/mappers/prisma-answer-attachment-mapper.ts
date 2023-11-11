import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswerAttachments } from '@/domain/forum/interprise/entities/answer-attachment'
import { Attachment as PrismaAttachment } from '@prisma/client'

export class PrismaAnswerAttachmentMapper {
  static toDomain(raw: PrismaAttachment): AnswerAttachments {
    if (!raw.answerId) throw new Error('Invalid Attachment type.')

    return AnswerAttachments.create(
      {
        answerId: new UniqueEntityID(raw.answerId),
        attachmentId: new UniqueEntityID(raw.id),
      },
      new UniqueEntityID(raw.id),
    )
  }
}
