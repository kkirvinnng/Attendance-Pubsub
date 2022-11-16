import { inject, injectable } from 'inversify'
import { ContainerSymbols } from '../../../../dependency-injection/symbols'
import { InvalidFormatVO } from '../../../../shared/domain/value-objects/InvalidFormatVO'
import { UserAuthRepository } from '../../../domain/repositories/UserAuthRepository'
import { EmailVO } from '../../../../shared/domain/value-objects/Email.vo'
import { InvalidCredential } from '../../errors/InvalidCredential'
import { UserEmailNotFound } from '../../errors/UserEmailNotFound'

/**
   @inject 
   @interface UserAuthRepository
*/
@injectable()
export class DeleteUserAccountUseCase {

    constructor(
        @inject(ContainerSymbols.FirebaseAuthRepository)
        private readonly authRepository: UserAuthRepository
    ) { }

    /**
    ** Delete a User in Firebase Auth 
    */
    async run(email: string) {

        try {
            const emailVO = EmailVO.build(email)

            const userFound = await this.authRepository.findUserByEmail(emailVO)

            if (userFound === null) {
                throw new UserEmailNotFound('')
            }

            await this.authRepository.deleteUser(userFound.uid!)

        } catch (err) {

            if (err instanceof InvalidFormatVO) {
                throw new InvalidCredential('User credentials are incorrect. Bad format of arguments')
            }
            throw err
        }
    }
}