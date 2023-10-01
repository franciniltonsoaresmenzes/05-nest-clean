import { EventHandler } from '@/core/events/event-handler'
import { AnswerRepository } from '@/domain/forum/application/repositories/answer-repository'
import { SendNotificationUseCase } from '../application/use-case/send-notification'
import { QuestionBestAnswerChosenEvent } from '@/domain/forum/interprise/events/question-best-answer-chosen-event'
import { DomainEvents } from '@/core/events/domain-events'

export class OnQuestionBestAnswerChosen implements EventHandler {
  constructor(
    private answerRepository: AnswerRepository,
    private sendNotification: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendQuestionBestAnswerNotification.bind(this),
      QuestionBestAnswerChosenEvent.name,
    )
  }

  private async sendQuestionBestAnswerNotification({
    question,
    bestAnswerId,
  }: QuestionBestAnswerChosenEvent) {
    const answer = await this.answerRepository.findById(bestAnswerId.toSring())

    if (answer) {
      await this.sendNotification.execute({
        recipientId: answer.authorId.toSring(),
        title: 'Sua resposta foi escolhida!',
        content: `A resposta que você enviou em ${question.title
          .substring(0, 20)
          .concat('...')} foi escolhido pelo autor!`,
      })
    }
  }
}
