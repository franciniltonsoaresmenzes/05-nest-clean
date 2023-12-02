import { AppModule } from '@/infra/app.module'
import { Database } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { AnswerFactory } from 'test/factories/make-answer'
import request from 'supertest'
import { StudentFactory } from 'test/factories/make-student'
import { QuestionFactory } from 'test/factories/make-question'

describe('Edit Answer (E2E)', () => {
  let app: INestApplication
  let studentFactory: StudentFactory
  let questionFactory: QuestionFactory
  let answerFactory: AnswerFactory
  let prisma: PrismaService
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, Database],
      providers: [StudentFactory, AnswerFactory, QuestionFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    studentFactory = moduleRef.get(StudentFactory)
    answerFactory = moduleRef.get(AnswerFactory)
    questionFactory = moduleRef.get(QuestionFactory)
    jwt = moduleRef.get(JwtService)
    prisma = moduleRef.get(PrismaService)
    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  it('[PUT] / answers/:id', async () => {
    const user = await studentFactory.makePrismaStudent()

    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
    })

    const answer = await answerFactory.makePrismaAnswer({
      authorId: user.id,
      questionId: question.id,
    })

    const accessToken = jwt.sign({ sub: user.id.toSring() })

    const response = await request(app.getHttpServer())
      .put(`/answers/${answer.id.toSring()}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        content: 'Edit Answer',
      })

    expect(response.statusCode).toBe(204)

    const answerOnDatabase = await prisma.answer.findFirst({
      where: {
        content: 'Edit Answer',
      },
    })

    expect(answerOnDatabase).toBeTruthy()
  })
})
