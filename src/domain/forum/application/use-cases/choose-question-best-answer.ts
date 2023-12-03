import { Either, left, right } from '@/core/either'
import { Question } from '../../interprise/entities/question'
import { AnswerRepository } from '../repositories/answer-repository'
import { QuestionsRepository } from '../repositories/questions-repository'
import { ResourceNotFoundError } from '../../../../core/erros/errors/resource-not-found-error'
import { NotAllowedError } from '../../../../core/erros/errors/not-allowed-error'
import { Injectable } from '@nestjs/common'

interface ChooseQuestionBestAnswerUseCaseResquest {
  answerId: string
  authorId: string
}

type ChooseQuestionBestAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    question: Question
  }
>

@Injectable()
export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private answerRepository: AnswerRepository,
    private questionsRepository: QuestionsRepository,
  ) {}

  async execute({
    answerId,
    authorId,
  }: ChooseQuestionBestAnswerUseCaseResquest): Promise<ChooseQuestionBestAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) return left(new ResourceNotFoundError())

    const question = await this.questionsRepository.findById(
      answer.questionId.toSring(),
    )

    if (!question) return left(new ResourceNotFoundError())

    if (authorId !== question.authorId.toSring())
      return left(new NotAllowedError())

    question.bestAnwserId = answer.id

    await this.questionsRepository.save(question)

    return right({ question })
  }
}
