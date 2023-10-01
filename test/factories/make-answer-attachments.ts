import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  AnswerAttachmentProps,
  AnswerAttachments,
} from '@/domain/forum/interprise/entities/answer-attachment'

export function makeAnswerAttachments(
  override: Partial<AnswerAttachmentProps> = {},
  id?: UniqueEntityID,
) {
  const answerAttachment = AnswerAttachments.create(
    {
      answerId: new UniqueEntityID(),
      attachmentId: new UniqueEntityID(),
      ...override,
    },
    id,
  )
  return answerAttachment
}
