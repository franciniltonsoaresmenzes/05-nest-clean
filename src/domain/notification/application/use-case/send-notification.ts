import { Either, right } from '@/core/either'
import { Notification } from '../../interprise/entities/notification'
import { NotificationRepository } from '../repositories/notification-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export type SendNotificationUseCaseRequest = {
  recipientId: string
  title: string
  content: string
}

export type SendNotificationUseCaseResponse = Either<
  null,
  {
    notification: Notification
  }
>

export class SendNotificationUseCase {
  constructor(private notifiactionRepository: NotificationRepository) {}

  async execute({
    recipientId,
    title,
    content,
  }: SendNotificationUseCaseRequest): Promise<SendNotificationUseCaseResponse> {
    const notification = Notification.create({
      recipientId: new UniqueEntityID(recipientId),
      title,
      content,
    })

    await this.notifiactionRepository.create(notification)

    return right({
      notification,
    })
  }
}
