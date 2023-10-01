import { Either, left, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Answer } from '../../interprise/entities/answer'
import { AnswerAttachments } from '../../interprise/entities/answer-attachment'
import { AnswerAttachmentList } from '../../interprise/entities/answer-attachments-list'
import { AnswerAttachmentsRepository } from '../repositories/answer-attachments-repository'
import { AnswerRepository } from '../repositories/answer-repository'
import { NotAllowedError } from '../../../../core/erros/errors/not-allowed-error'
import { ResourceNotFoundError } from '../../../../core/erros/errors/resource-not-found-error'

interface EditAnswerUseCaseResquest {
  authorId: string
  answerId: string
  content: string
  attachmentsIds: string[]
}

type EditAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    answer: Answer
  }
>

export class EditAnswerUseCase {
  constructor(
    private answersRepository: AnswerRepository,
    private answersAttachmentsRepository: AnswerAttachmentsRepository,
  ) {}

  async execute({
    authorId,
    answerId,
    content,
    attachmentsIds,
  }: EditAnswerUseCaseResquest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) return left(new ResourceNotFoundError())

    if (authorId !== answer.authorId.toSring()) {
      return left(new NotAllowedError())
    }
    const currentQuestionAttachments =
      await this.answersAttachmentsRepository.findManyByAnswerId(answerId)

    const questionAttachmentList = new AnswerAttachmentList(
      currentQuestionAttachments,
    )

    const answersAttachments = attachmentsIds.map((attachmentId) => {
      return AnswerAttachments.create({
        attachmentId: new UniqueEntityID(attachmentId),
        answerId: answer.id,
      })
    })

    questionAttachmentList.update(answersAttachments)

    answer.attachments = questionAttachmentList
    answer.content = content

    await this.answersRepository.save(answer)

    return right({ answer })
  }
}
