import { AnswerAttachments } from './answer-attachment'
import { WatchedList } from './value-objects/watched-list'

export class AnswerAttachmentList extends WatchedList<AnswerAttachments> {
  compareItems(a: AnswerAttachments, b: AnswerAttachments): boolean {
    return a.attachmentId.equals(b.attachmentId)
  }
}
