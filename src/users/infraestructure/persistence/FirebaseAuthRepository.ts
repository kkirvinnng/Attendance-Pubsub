import { injectable } from 'inversify'
import { Auth, UserRecord } from 'firebase-admin/auth'
import firebase from '../../../shared/infraestructure/firebase/index'
import { UserAuthRepository } from '../../domain/repositories/UserAuthRepository'
import { UserAuth } from '../../domain/entities/UserAuth'
import { EmailVO } from '../../domain/value-objects/Email.vo'

@injectable()
export class FirebaseAuthRepository implements UserAuthRepository {
    private _auth: Auth
    constructor() {
        this._auth = firebase.auth
    }

    private toDomain(persistanceUser: UserRecord) {
        const { email, uid } = persistanceUser

        const emailVO = new EmailVO(email!)

        return UserAuth.create({
            email: emailVO,
            uid
        })
    }

    private toPersistance({ email, password }: UserAuth) {

        return {
            email: email.value,
            password: password?.value
        }
    }

    async createUser(user: UserAuth): Promise<void> {
        const persistUser = this.toPersistance(user)

        await this._auth.createUser(persistUser)
    }

    async deleteUser(uid: string): Promise<void> {

        await this._auth.deleteUser(uid)
    }

    async findUserByEmail(email: EmailVO): Promise<UserAuth | null> {
        const persistUser = this.toPersistance({ email })

        try {
            const userRecord = await this._auth.getUserByEmail(persistUser.email)

            return this.toDomain(userRecord)

        } catch (err) {
            /**
             **-- Firebase throw 'FirebaseAuthError' if the user doesnt exists 
             * Corresponding Exception; FirebaseAuthError: There is no user record corresponding to the provided identifier.
             */
            return null
        }

    }
}