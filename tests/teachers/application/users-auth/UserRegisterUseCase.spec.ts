import 'reflect-metadata'
import { InvalidCredential } from '../../../../src/teachers/application/errors/InvalidCredential'
import { UserRegisterUseCase } from '../../../../src/teachers/application/use-cases/users-auth/UserRegister.usecase'
import { FirebaseAuthRepositoryMock } from '../../__mocks__/FirebaseAuthRepositoryMock'
import { FirebaseTeacherRepositoryMock } from '../../__mocks__/FirebaseTeacherRepositoryMock'

describe('UserRegisterUseCase', () => {
    let repository: FirebaseAuthRepositoryMock
    let teacherRepository: FirebaseTeacherRepositoryMock
    let userRegister: UserRegisterUseCase

    beforeAll(() => {
        repository = new FirebaseAuthRepositoryMock()
        teacherRepository = new FirebaseTeacherRepositoryMock()
        userRegister = new UserRegisterUseCase(repository, teacherRepository)
    })


    it('creates a user in firebase auth', async () => {
        const user = {
            email: 'mypersonalemail@gmail.com',
            password: 'ExcelentPassword123'
        }

        await userRegister.run(user.email, user.password)

        repository.assertSaveHasBeenCalled()
    })

    it('Should return a (InvalidRegister) when pass a incorrect email', async () => {
        expect.assertions(1)

        const incorrectEmail = 'kkirvigmail.com'
        const invalidPassword = 'Asdasdas12312312'
        try {
            await userRegister.run(incorrectEmail, invalidPassword)
            fail('expect an exception')

        } catch (err: unknown) {

            expect(err)
                .toBeInstanceOf(InvalidCredential)
        }
    })

    afterAll(() => {
        jest.clearAllMocks()
    })
})