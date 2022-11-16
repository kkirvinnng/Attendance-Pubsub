import { NextFunction, Response, Request } from 'express'
import { UserCreated } from '../../../../teachers/domain/publisher/UserCreated'
import { UserRegisterUseCase } from '../../../../teachers/application/use-cases/users-auth/UserRegister.usecase'
import { injectable, inject } from 'inversify'
import { ContainerSymbols } from '../../../../dependency-injection/symbols'
import { Publisher } from '../../../../shared/domain/pubsub/Publisher'
import logger from '../../../../shared/infraestructure/logger/Winston'
import { successResponse } from '../../../http-response/successResponse'

/**
   @inject 
   @class UserRegisterUseCase
   @class Publisher (GCPPubsub)
*/
@injectable()
export class UserRegisterController {

    constructor(
        @inject(ContainerSymbols.UserRegisterUseCase)
        private readonly userRegisterUseCase: UserRegisterUseCase,
        @inject(ContainerSymbols.GCPPubSub)
        private readonly pubsub: Publisher
    ) { }
    async run(req: Request, res: Response, next: NextFunction) {
        const { email, password, isTeacher } = req.body

        try {
            await this.userRegisterUseCase.run(email, password)
            logger.info(' User Authenticated 👌')

            const userPub: UserCreated = {
                email,
                isTeacher
            }

            await this.pubsub.publishJSON('user_created', userPub)
            logger.info('Message Published 📩')

            return successResponse(res)

        } catch (err) {
            return next(err)
        }
    }
}