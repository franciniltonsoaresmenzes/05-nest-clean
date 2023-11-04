import { Question } from '@/domain/forum/interprise/entities/question'

export class QuestionPresenter {
  static toHTTP(question: Question) {
    return {
      id: question.id.toSring(),
      title: question.title,
      slug: question.slug.value,
      bestAnswerId: question.bestAnwserId?.toSring(),
      createdAt: question.createdAd,
      updatedAt: question.updatedAt,
    }
  }
}
