import { QuestionAttachment } from './question-attachment'
import { WatchedList } from './value-objects/watched-list'

export class QuestionAttachmentList extends WatchedList<QuestionAttachment> {
  compareItems(a: QuestionAttachment, b: QuestionAttachment): boolean {
    return a.attachmentId.equals(b.attachmentId)
  }
}
