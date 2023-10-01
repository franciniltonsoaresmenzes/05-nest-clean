import { Either, left, right } from '@/core/either'
import { AnswerCommentsRepository } from '../repositories/answer-comment-repository'
import { ResourceNotFoundError } from '../../../../core/erros/errors/resource-not-found-error'
import { NotAllowedError } from '../../../../core/erros/errors/not-allowed-error'

interface DeleteAnswerCommentUseCaseResquest {
  authorId: string
  answerCommentId: string
}

type DeleteAnswerCommentUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>

export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentRepository: AnswerCommentsRepository) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentUseCaseResquest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answerComment =
      await this.answerCommentRepository.findById(answerCommentId)

    if (!answerComment) return left(new ResourceNotFoundError())

    if (authorId !== answerComment.authorId.toSring()) {
      return left(new NotAllowedError())
    }

    await this.answerCommentRepository.delete(answerComment)

    return right(null)
  }
}
