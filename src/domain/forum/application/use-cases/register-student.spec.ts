import { FakerHasher } from 'test/cryptography/fake-hasher'
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository'
import { RegisterStudentUseCase } from './register-student'

let fakerHasher: FakerHasher
let inMemoryStudentsRepository: InMemoryStudentsRepository
let sut: RegisterStudentUseCase

describe('Register Student', () => {
  beforeEach(() => {
    fakerHasher = new FakerHasher()
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    sut = new RegisterStudentUseCase(inMemoryStudentsRepository, fakerHasher)
  })

  it('should to be able to register a new student.', async () => {
    const result = await sut.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password: '123456',
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value).toEqual({
      student: inMemoryStudentsRepository.items[0],
    })
  })

  it('should hash student upon registration.', async () => {
    const result = await sut.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password: '123456',
    })

    const hashedPassword = await fakerHasher.hash('123456')

    console.error(inMemoryStudentsRepository.items[0].password)

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryStudentsRepository.items[0].password).toEqual(hashedPassword)
  })
})
