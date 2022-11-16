import { NextFunction, Response, Request } from 'express'
import { inject, injectable } from 'inversify'
import { ContainerSymbols } from '../../../dependency-injection/symbols'

import { LoadStudentsUseCase } from '../../../teachers/application/use-cases/students/LoadStudents.usecase'
import { successResponse } from '../../http-response/successResponse'

/**
   @inject 
   @class LoadStudentsUseCase
*/
@injectable()
export class LoadStudentsController {

    constructor(
        @inject(ContainerSymbols.LoadStudentsUseCase)
        private readonly loadStudentsUseCase: LoadStudentsUseCase,
    ) { }

    async run(req: Request, res: Response, next: NextFunction) {
        const { teacher, sheetId } = req.body

        try {
            await this.loadStudentsUseCase.run(teacher, sheetId)


            return successResponse(res)
        } catch (err) {
            return next(err)
        }
    }
}