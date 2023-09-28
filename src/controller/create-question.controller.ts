import { Controller, Post, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { UserPayload } from 'src/auth/jwt.strategy'
import { CurrentUser } from './current-user-decorator'

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
  @Post()
  async handle(@CurrentUser() user: UserPayload) {
    console.log(user)
    return 'ok'
  }
}
