import { FakeEncrypter } from 'test/cryptography/fake-encrypter'
import { FakerHasher } from 'test/cryptography/fake-hasher'
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository'
import { AuthenticateStudentUseCase } from './authenticate-student'
import { makeStudent } from 'test/factories/make-student'

let fakerHasher: FakerHasher
let fakeEncrypter: FakeEncrypter
let inMemoryStudentsRepository: InMemoryStudentsRepository
let sut: AuthenticateStudentUseCase

describe('Register Student', () => {
  beforeEach(() => {
    fakerHasher = new FakerHasher()
    fakeEncrypter = new FakeEncrypter()

    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    sut = new AuthenticateStudentUseCase(
      inMemoryStudentsRepository,
      fakerHasher,
      fakeEncrypter,
    )
  })

  it('should to be able to authenticate student.', async () => {
    const student = makeStudent({
      email: 'jhondoe@example.com',
      password: await fakerHasher.hash('123456'),
    })

    inMemoryStudentsRepository.create(student)

    const result = await sut.execute({
      email: 'jhondoe@example.com',
      password: '123456',
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    })
  })
})
