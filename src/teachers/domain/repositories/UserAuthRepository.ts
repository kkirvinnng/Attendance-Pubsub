import { UserAuth } from '../entities/UserAuth'
import { EmailVO } from '../../../shared/domain/value-objects/Email.vo'

export interface UserAuthRepository {
    createUser(user: UserAuth): Promise<void>
    deleteUser(uid: string): Promise<void>
    findUserByEmail(email: EmailVO): Promise<UserAuth | null>
}