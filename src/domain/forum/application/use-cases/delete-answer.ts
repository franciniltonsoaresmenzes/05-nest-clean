import { Either, left, right } from '@/core/either'
import { AnswerRepository } from '../repositories/answer-repository'
import { NotAllowedError } from '../../../../core/erros/errors/not-allowed-error'
import { ResourceNotFoundError } from '../../../../core/erros/errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'

interface DeleteAnswerUseCaseResquest {
  authorId: string
  answerId: string
}

type DeleteAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>

@Injectable()
export class DeleteAnswerUseCase {
  constructor(private answerRepository: AnswerRepository) {}

  async execute({
    answerId,
    authorId,
  }: DeleteAnswerUseCaseResquest): Promise<DeleteAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) return left(new ResourceNotFoundError())

    if (authorId !== answer.authorId.toSring()) {
      return left(new NotAllowedError())
    }

    await this.answerRepository.delete(answer)

    return right(null)
  }
}
