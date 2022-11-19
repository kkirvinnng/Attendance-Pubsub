import { NextFunction, Response, Request } from 'express'
import { inject, injectable } from 'inversify'
import { ContainerSymbols } from '../../../dependency-injection/symbols'
import { Publisher } from '../../../shared/domain/pubsub/Publisher'
import logger from '../../../shared/infraestructure/logger/Winston'

import { LoadStudentsPub } from '../../../teachers/domain/publisher/LoadStudents'
import { MainTeacherVO } from '../../../teachers/domain/value-objects/MainTeacher.vo'
import { successResponse } from '../../http-response/successResponse'


@injectable()
export class LoadStudentsController {

    constructor(
        @inject(ContainerSymbols.GCPPubSub)
        private readonly pubsub: Publisher
    ) { }

    async run(req: Request, res: Response, next: NextFunction) {
        const { teacher, sheetId } = req.body

        try {
            const teacherVO = MainTeacherVO.build(teacher)

            const msg: LoadStudentsPub = {
                teacher: teacherVO.value,
                sheetId
            }

            await this.pubsub.publishJSON('load_students', msg)
            logger.info(' Message Published 📩')

            return successResponse(res)
        } catch (err) {
            return next(err)
        }
    }
}