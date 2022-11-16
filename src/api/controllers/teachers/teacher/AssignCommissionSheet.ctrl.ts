import { NextFunction, Response, Request } from 'express'
import { inject, injectable } from 'inversify'
import { ContainerSymbols } from '../../../../dependency-injection/symbols'
import { Publisher } from '../../../../shared/domain/pubsub/Publisher'
import logger from '../../../../shared/infraestructure/logger/Winston'
import { Commission } from '../../../../teachers/domain/entities/Commission'
import { CommissionAssigned } from '../../../../teachers/domain/publisher/CommissionAssigned'
import { CommissionVO } from '../../../../teachers/domain/value-objects/Commission.vo'
import { MainTeacherVO } from '../../../../teachers/domain/value-objects/MainTeacher.vo'
import { SubjectVO } from '../../../../teachers/domain/value-objects/Subject.vo'
import { successResponse } from '../../../http-response/successResponse'

/**
   @inject 
   @interface Publisher
*/
@injectable()
export class AssignCommissionSheetController {

    constructor(
        @inject(ContainerSymbols.GCPPubSub)
        private readonly pubsub: Publisher
    ) { }

    async run(req: Request, res: Response, next: NextFunction) {
        const { sheetId, teacher, commission, subject } = req.body

        try {

            const com = Commission.create(
                MainTeacherVO.build(teacher),
                CommissionVO.build(commission),
                SubjectVO.build(subject)
            )

            const assign: CommissionAssigned = {
                sheetId,
                commission: com.toPrimitives()
            }

            await this.pubsub.publishJSON('assign_commission_sheet', assign)
            logger.info(' Message Published 📩')

            return successResponse(res)
        } catch (err) {
            return next(err)
        }
    }
}