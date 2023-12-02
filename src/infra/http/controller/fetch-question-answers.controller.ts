import { FetchQuestionAnswersUseCase } from '@/domain/forum/application/use-cases/fetch-question-answer'
import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { AnswerPresent } from '../presenters/answer-presenter'

const pageQueryBodySchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

type pageQueryBodySchema = z.infer<typeof pageQueryBodySchema>

const queryValidationPipe = new ZodValidationPipe(pageQueryBodySchema)

@Controller('/queston/:questionsId/answers')
export class FetchQuestionAnswersController {
  constructor(private fetchQuestionAnswers: FetchQuestionAnswersUseCase) {}

  @Get()
  async handle(
    @Query('page', queryValidationPipe) page: pageQueryBodySchema,
    @Param('questionsId') questionsId: string,
  ) {
    const result = await this.fetchQuestionAnswers.execute({
      questionsId,
      page,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const answers = result.value.answers

    return { answers: answers.map(AnswerPresent.toHttp) }
  }
}
