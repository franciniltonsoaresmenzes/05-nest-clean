import { AppModule } from '@/infra/app.module'
import { Database } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { QuestionFactory } from 'test/factories/make-question'
import request from 'supertest'
import { StudentFactory } from 'test/factories/make-student'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

describe('Delete Question (E2E)', () => {
  let app: INestApplication
  let studentFactory: StudentFactory
  let questionFactory: QuestionFactory
  let prisma: PrismaService
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, Database],
      providers: [StudentFactory, QuestionFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    studentFactory = moduleRef.get(StudentFactory)
    questionFactory = moduleRef.get(QuestionFactory)
    jwt = moduleRef.get(JwtService)
    prisma = moduleRef.get(PrismaService)
    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  it('[DELETE] /question/:id', async () => {
    const user = await studentFactory.makePrismaStudent()
    const accessToken = jwt.sign({ sub: user.id.toSring() })
    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
    })
    const response = await request(app.getHttpServer())
      .delete(`/questions/${question.id.toSring()}`)
      .set('Authorization', `Bearer ${accessToken}`)

    const questionOnDataBase = await prisma.question.findUnique({
      where: {
        id: question.id.toSring(),
      },
    })

    expect(response.statusCode).toBe(204)
    expect(questionOnDataBase).toBeNull()
  })
})
