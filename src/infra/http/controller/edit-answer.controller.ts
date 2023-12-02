import { EditAnswerUseCase } from '@/domain/forum/application/use-cases/edit-answer'
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

const editeAnswerSchemaBody = z.object({
  content: z.string(),
})

type EditAnswerSchemaBody = z.infer<typeof editeAnswerSchemaBody>

const bodyValidatePipe = new ZodValidationPipe(editeAnswerSchemaBody)

@Controller('/answers/:id')
export class EditAnswerController {
  constructor(private editeAnswer: EditAnswerUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(bodyValidatePipe) body: EditAnswerSchemaBody,
    @CurrentUser() user: UserPayload,
    @Param('id') answerId: string,
  ) {
    const userId = user.sub

    const { content } = body

    const result = await this.editeAnswer.execute({
      authorId: userId,
      answerId,
      content,
      attachmentsIds: [],
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
