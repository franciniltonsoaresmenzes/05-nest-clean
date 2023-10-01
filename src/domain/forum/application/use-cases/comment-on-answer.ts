import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswerRepository } from '../repositories/answer-repository'
import { AnswerCommentsRepository } from '../repositories/answer-comment-repository'
import { AnswerComment } from '../../interprise/entities/answer-comment'
import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '../../../../core/erros/errors/resource-not-found-error'

interface CommentOnAnswerUseCaseResquest {
  authorId: string
  answerId: string
  content: string
}

type CommentOnAnswerUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    answerComment: AnswerComment
  }
>

export class CommentOnAnswerUseCase {
  constructor(
    private answersRepository: AnswerRepository,
    private answersComments: AnswerCommentsRepository,
  ) {}

  async execute({
    authorId,
    answerId,
    content,
  }: CommentOnAnswerUseCaseResquest): Promise<CommentOnAnswerUseCaseResponse> {
    const question = await this.answersRepository.findById(answerId)

    if (!question) return left(new ResourceNotFoundError())

    const questionComment = AnswerComment.create({
      authorId: new UniqueEntityID(authorId),
      answerId: new UniqueEntityID(answerId),
      content,
    })

    await this.answersComments.create(questionComment)

    return right({ answerComment: questionComment })
  }
}
