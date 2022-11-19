import { InvalidFormatVO } from '../../../../shared/domain/value-objects/InvalidFormatVO'
import { UserAuth } from '../../../domain/entities/UserAuth'
import { UserAuthRepository } from '../../../domain/repositories/UserAuthRepository'
import { EmailVO } from '../../../../shared/domain/value-objects/Email.vo'
import { PasswordVO } from '../../../domain/value-objects/Password.vo'
import { InvalidCredential } from '../../errors/InvalidCredential'
import { UserEmailAlreadyExists } from '../../errors/UserEmailAlreadyExists'
import { injectable, inject } from 'inversify'
import { ContainerSymbols } from '../../../../dependency-injection/symbols'
import { TeacherRepository } from '../../../domain/repositories/TeacherRepository'
import { cutEmail } from '../../../../shared/domain/cutEmail'

/**
   @inject 
   @interface UserAuthRepository
*/
@injectable()
export class UserRegisterUseCase {

    constructor(
        @inject(ContainerSymbols.FirebaseAuthRepository)
        private readonly authRepository: UserAuthRepository,
        @inject(ContainerSymbols.FirebaseAuthRepository)
        private readonly datasource: TeacherRepository
    ) { }

    /**
    ** Create a User on Firebase Auth 
    */
    async run(email: string, password: string) {

        try {

            const user = UserAuth.create({
                email: EmailVO.build(email),
                password: PasswordVO.build(password)
            })

            const userFound = await this.authRepository.findUserByEmail(user.email)

            if (userFound) {
                throw new UserEmailAlreadyExists('The email address is already in use by another account.')
            }

            const userExists = await this.datasource.exists(cutEmail(user.email.value))

            if (userExists) {
                throw new UserEmailAlreadyExists('The email address is already in use by another account.')
            }

            await this.authRepository.createUser(user)

        } catch (err: unknown) {

            if (err instanceof InvalidFormatVO) {
                throw new InvalidCredential('User credentials are incorrect. Bad format of arguments')
            }
            throw err
        }
    }
}