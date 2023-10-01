import { Either, right } from '@/core/either'
import { AnswerComment } from '../../interprise/entities/answer-comment'
import { AnswerCommentsRepository } from '../repositories/answer-comment-repository'

interface FetchAnswerCommentsUseCaseResquest {
  page: number
  answersId: string
}

type FetchAnswerCommentsUseCaseResponse = Either<
  null,
  {
    answerComments: AnswerComment[]
  }
>

export class FetchAnswerCommentsUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({
    page,
    answersId,
  }: FetchAnswerCommentsUseCaseResquest): Promise<FetchAnswerCommentsUseCaseResponse> {
    const answerComments =
      await this.answerCommentsRepository.findManyByAnswerId(answersId, {
        page,
      })

    return right({ answerComments })
  }
}
