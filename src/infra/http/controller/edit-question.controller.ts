import { EditQuestionUseCase } from '@/domain/forum/application/use-cases/edit-question'
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Put,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { CurrentUser } from './current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'

const ediQuestiontBodySchema = z.object({
  title: z.string(),
  content: z.string(),
})

const zodValidatePipe = new ZodValidationPipe(ediQuestiontBodySchema)

type EditQuestionBodySchema = z.infer<typeof ediQuestiontBodySchema>

@Controller('/questions/:id')
export class EditQuesitonController {
  constructor(private editQuestion: EditQuestionUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(zodValidatePipe) body: EditQuestionBodySchema,
    @CurrentUser() user: UserPayload,
    @Param('id') questionId: string,
  ) {
    const { title, content } = body

    const userId = user.sub

    const result = await this.editQuestion.execute({
      authorId: userId,
      title,
      content,
      questionId,
      attachmentsIds: [],
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
