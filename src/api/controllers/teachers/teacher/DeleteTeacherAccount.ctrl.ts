import { NextFunction, Response, Request } from 'express'
import { inject, injectable } from 'inversify'
import { ContainerSymbols } from '../../../../dependency-injection/symbols'
import { Publisher } from '../../../../shared/domain/pubsub/Publisher'
import logger from '../../../../shared/infraestructure/logger/Winston'
import { DeleteUserAccountUseCase } from '../../../../teachers/application/use-cases/users-auth/DeleteUserAccount.usecase'
import { TeacherDeleted } from '../../../../teachers/domain/publisher/TeacherDeleted'
import { successResponse } from '../../../http-response/successResponse'

/**
   @inject 
   @class DeleteUserAccountUseCase
   @interface Publisher
*/

@injectable()
export class DeleteTeacherAccountController {

    constructor(
        @inject(ContainerSymbols.DeleteUserAccountUseCase)
        private readonly deleteUserAccountUseCase: DeleteUserAccountUseCase,
        @inject(ContainerSymbols.GCPPubSub)
        private readonly pubsub: Publisher
    ) { }

    async run(req: Request, res: Response, next: NextFunction) {
        const { email } = req.body

        try {
            await this.deleteUserAccountUseCase.run(email)

            const userPub: TeacherDeleted = {
                email
            }

            await this.pubsub.publishJSON('teacher_deleted', userPub)
            logger.info(' Message Published 📩')

            return successResponse(res)
        } catch (err) {
            return next(err)
        }
    }
}