import { UserAuth } from '../../../src/teachers/domain/entities/UserAuth'
import { UserAuthRepository } from '../../../src/teachers/domain/repositories/UserAuthRepository'
import { EmailVO } from '../../../src/teachers/domain/value-objects/Email.vo'

export class FirebaseAuthRepositoryMock implements UserAuthRepository {

    private mockSave = jest.fn()
    private mockRemove = jest.fn()
    private mockMatching = jest.fn()
    private users: Array<UserAuth> = []

    async createUser(user: UserAuth): Promise<void> {
        this.mockSave(user)
        this.users.push(user)

    }

    async deleteUser(uid: string): Promise<void> {
        this.mockRemove(uid)
        this.users.pop()
    }

    async findUserByEmail(email: EmailVO): Promise<UserAuth | null> {
        const user = this.users.find(u => u.email.equals(email))

        if (!user) return null

        this.mockMatching(user)
        return user

    }

    assertSaveHasBeenCalled() {
        expect(this.mockSave).toHaveBeenCalled()
    }

    assertMatchingHasBeenCalled() {
        expect(this.mockMatching).toHaveBeenCalled()
    }

    assertRemoveHasBeenCalled() {
        expect(this.mockRemove).toHaveBeenCalled()
    }
}