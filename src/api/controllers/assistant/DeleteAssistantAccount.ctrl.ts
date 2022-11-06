import { NextFunction, Response, Request } from 'express'
import { inject, injectable } from 'inversify'
import { ContainerSymbols } from '../../../dependency-injection/symbols'
import logger from '../../../shared/infraestructure/logger/Winston'
import { DeleteAssistantUseCase } from '../../../users/application/use-cases/assistant/DeleteAssistant.usecase'
import { DeleteUserAccountUseCase } from '../../../users/application/use-cases/users-auth/DeleteUserAccount.usecase'
import { successResponse } from '../../http-response/successResponse'

/**
   @inject 
   @class DeleteUserAccountUseCase
   @class DeleteAssistantUseCase
*/
@injectable()
export class DeleteAssistantAccountController {

    constructor(
        @inject(ContainerSymbols.DeleteUserAccountUseCase)
        private readonly deleteUserAccountUseCase: DeleteUserAccountUseCase,
        @inject(ContainerSymbols.DeleteAssistantUseCase)
        private readonly deleteAssistantUseCase: DeleteAssistantUseCase
    ) { }

    async run(req: Request, res: Response, next: NextFunction) {
        const { email } = req.body

        try {
            await this.deleteUserAccountUseCase.run(email)

            await this.deleteAssistantUseCase.run(email)

            logger.info('Assistant deleted ✅')
            return successResponse(res)
        } catch (err) {
            return next(err)
        }
    }
}