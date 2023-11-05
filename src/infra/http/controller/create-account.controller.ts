import { StudentAlreadyExistError } from '@/domain/forum/application/use-cases/errors/student-already-exits-error'
import { RegisterStudentUseCase } from '@/domain/forum/application/use-cases/register-student'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Post,
  UsePipes,
} from '@nestjs/common'
import { z } from 'zod'

const createAccountSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
})

type createAccountBody = z.infer<typeof createAccountSchema>

@Controller('/accounts')
export class CreateAccountController {
  constructor(private registerStudent: RegisterStudentUseCase) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createAccountSchema))
  async handle(@Body() body: createAccountBody) {
    const { name, email, password } = body

    const result = await this.registerStudent.execute({
      name,
      email,
      password,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case StudentAlreadyExistError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException()
      }
    }
  }
}
