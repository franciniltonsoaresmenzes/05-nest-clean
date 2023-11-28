import { Either, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Answer } from '../../interprise/entities/answer'
import { AnswerAttachmentList } from '../../interprise/entities/answer-attachments-list'
import { AnswerRepository } from '../repositories/answer-repository'
import { AnswerAttachments } from '../../interprise/entities/answer-attachment'
import { Injectable } from '@nestjs/common'

interface AnswerQuestionUseCaseResquest {
  authorId: string
  questionId: string
  attachmentsIds: string[]
  content: string
}

type AnswerQuestionUseCaseResponse = Either<
  null,
  {
    answer: Answer
  }
>

@Injectable()
export class AnswerQuestionUseCase {
  constructor(private answerRepository: AnswerRepository) {}

  async execute({
    authorId: instructorId,
    questionId,
    attachmentsIds,
    content,
  }: AnswerQuestionUseCaseResquest): Promise<AnswerQuestionUseCaseResponse> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityID(instructorId),
      questionId: new UniqueEntityID(questionId),
    })

    const answerAttachments = attachmentsIds.map((attachmentsId) => {
      return AnswerAttachments.create({
        attachmentId: new UniqueEntityID(attachmentsId),
        answerId: answer.id,
      })
    })

    answer.attachments = new AnswerAttachmentList(answerAttachments)

    await this.answerRepository.create(answer)

    return right({ answer })
  }
}
