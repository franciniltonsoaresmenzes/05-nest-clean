import { Answer } from '@/domain/forum/interprise/entities/answer'

export class AnswerPresent {
  static toHttp(answer: Answer) {
    return {
      id: answer.id.toSring(),
      content: answer.content,
      createdAt: answer.createdAd,
      updateAt: answer.updatedAt,
    }
  }
}
