import 'reflect-metadata'
import { UserEmailNotFound } from '../../../../src/users/application/errors/UserEmailNotFound'
import { DeleteUserAccountUseCase } from '../../../../src/users/application/use-cases/users-auth/DeleteUserAccount.usecase'
import { UserAuth } from '../../../../src/users/domain/entities/UserAuth'
import { EmailVO } from '../../../../src/users/domain/value-objects/Email.vo'
import { PasswordVO } from '../../../../src/users/domain/value-objects/Password.vo'
import { FirebaseAuthRepositoryMock } from '../../__mocks__/FirebaseAuthRepositoryMock'

describe('DeleteUserAccountUseCase', () => {
    let repository: FirebaseAuthRepositoryMock
    let deleteUserAccount: DeleteUserAccountUseCase

    beforeAll(() => {
        repository = new FirebaseAuthRepositoryMock()
        deleteUserAccount = new DeleteUserAccountUseCase(repository)
    })


    it('should be remove a user', async () => {
        const email = 'mypersonalemail@gmail.com'

        const user: UserAuth = {
            email: EmailVO.build(email),
            password: PasswordVO.build('ExcelentPassword123')
        }

        await repository.createUser(user)

        await deleteUserAccount.run(email)

        repository.assertRemoveHasBeenCalled()
    })

    it('should return an exception (InvalidCredential) when trying to remove an user that doesnt exists ', async () => {
        expect.assertions(1)

        const email = 'mypersonalemail@gmail.com'
        try {
            await deleteUserAccount.run(email)
            fail('expect an exception')

        } catch (err: unknown) {

            expect(err)
                .toBeInstanceOf(UserEmailNotFound)
        }
    })
    afterAll(() => {
        jest.clearAllMocks()
    })
})