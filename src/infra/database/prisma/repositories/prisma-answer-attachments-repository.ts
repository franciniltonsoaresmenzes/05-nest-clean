import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository'
import { AnswerAttachments } from '@/domain/forum/interprise/entities/answer-attachment'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaAnswerAttachmentMapper } from '../mappers/prisma-answer-attachment-mapper'

@Injectable()
export class PrismaAnswerAttachmentsRepository
  implements AnswerAttachmentsRepository
{
  constructor(private prisma: PrismaService) {}

  async findManyByAnswerId(answerId: string): Promise<AnswerAttachments[]> {
    const data = await this.prisma.attachment.findMany({
      where: {
        answerId,
      },
    })

    return data.map(PrismaAnswerAttachmentMapper.toDomain)
  }

  async deleteManyByAnswerId(answerId: string): Promise<void> {
    await this.prisma.answer.delete({
      where: {
        id: answerId,
      },
    })
  }
}
