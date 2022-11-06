import { EmailVO } from '../value-objects/Email.vo'
import { PasswordVO } from '../value-objects/Password.vo'

export class UserAuth {
    /**
     * Constructor
     * @param email 
     * @param password 
     * @param uid 
     */
    private constructor(
        public email: EmailVO,
        public password?: PasswordVO,
        public uid?: string

    ) { }

    static create({
        email,
        password,
        uid
    }: {
        email: EmailVO,
        password?: PasswordVO,
        uid?: string
    }
    ) {
        return new UserAuth(email, password, uid)
    }
}
