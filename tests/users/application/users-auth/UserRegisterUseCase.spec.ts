import 'reflect-metadata'
import { InvalidCredential } from '../../../../src/users/application/errors/InvalidCredential'
import { UserRegisterUseCase } from '../../../../src/users/application/use-cases/users-auth/UserRegister.usecase'
import { FirebaseAuthRepositoryMock } from '../../__mocks__/FirebaseAuthRepositoryMock'

describe('UserRegisterUseCase', () => {
    let repository: FirebaseAuthRepositoryMock
    let userRegister: UserRegisterUseCase

    beforeAll(() => {
        repository = new FirebaseAuthRepositoryMock()
        userRegister = new UserRegisterUseCase(repository)
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

        const correctEmail = 'kkirvigmail.com'
        const invalidPassword = 'Asdasdas12312312'
        try {
            await userRegister.run(correctEmail, invalidPassword)
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