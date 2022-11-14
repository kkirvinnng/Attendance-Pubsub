import { NextFunction, Response, Request } from 'express'
import { inject, injectable } from 'inversify'
import { ContainerSymbols } from '../../../dependency-injection/symbols'
import { cutEmail } from '../../../shared/domain/cutEmail'
import logger from '../../../shared/infraestructure/logger/Winston'
import { AssignSubjectUseCase } from '../../../teachers/application/use-cases/assistant/AssignSubject.usecase'
import { Assistant } from '../../../teachers/domain/entities/Assistant'
import { Commission } from '../../../teachers/domain/entities/Commission'
import { CommissionVO } from '../../../teachers/domain/value-objects/Commission.vo'
import { EmailVO } from '../../../teachers/domain/value-objects/Email.vo'
import { MainTeacherVO } from '../../../teachers/domain/value-objects/MainTeacher.vo'
import { SubjectVO } from '../../../teachers/domain/value-objects/Subject.vo'
import { successResponse } from '../../http-response/successResponse'

/**
   @inject 
   @class AssignSubjectUseCase
*/
@injectable()
export class AssignSubjectController {

    constructor(
        @inject(ContainerSymbols.AssignSubjectUseCase)
        private readonly assignSubjectUseCase: AssignSubjectUseCase
    ) { }

    async run(req: Request, res: Response, next: NextFunction) {
        const { assistantEmail, teacherEmail, subject, commission } = req.body

        try {
            const teacherEmailCuted = cutEmail(EmailVO.build(teacherEmail).value)

            const mainTeacher = MainTeacherVO.build(teacherEmailCuted)
            const assitantCommission = CommissionVO.build(commission)
            const assistantSubject = SubjectVO.build(subject)

            const commissionSubscription = Commission.create(
                mainTeacher,
                assitantCommission,
                assistantSubject
            )

            const assistant = Assistant.create({
                name: cutEmail(EmailVO.build(assistantEmail).value),
                commissionSubscription
            })

            await this.assignSubjectUseCase.run(assistant)

            logger.info('The subject was assigned ✅')
            return successResponse(res)
        } catch (err) {
            return next(err)
        }
    }
}