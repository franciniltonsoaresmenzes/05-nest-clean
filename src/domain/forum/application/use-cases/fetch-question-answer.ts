import { Either, right } from '@/core/either'
import { Answer } from '../../interprise/entities/answer'
import { AnswerRepository } from '../repositories/answer-repository'
import { Injectable } from '@nestjs/common'

interface FetchQuestionAnswersUseCaseResquest {
  page: number
  questionsId: string
}

type FetchQuestionAnswersUseCaseResponse = Either<
  null,
  {
    answers: Answer[]
  }
>

@Injectable()
export class FetchQuestionAnswersUseCase {
  constructor(private answerRepository: AnswerRepository) {}

  async execute({
    page,
    questionsId,
  }: FetchQuestionAnswersUseCaseResquest): Promise<FetchQuestionAnswersUseCaseResponse> {
    const answers = await this.answerRepository.findManyByQuestionId(
      questionsId,
      { page },
    )

    return right({ answers })
  }
}
