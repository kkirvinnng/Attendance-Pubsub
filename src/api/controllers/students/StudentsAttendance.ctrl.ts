import { NextFunction, Response, Request } from 'express'
import { inject, injectable } from 'inversify'
import { ContainerSymbols } from '../../../dependency-injection/symbols'
import { Publisher } from '../../../shared/domain/pubsub/Publisher'
import logger from '../../../shared/infraestructure/logger/Winston'
import { ClassAttendance } from '../../../teachers/domain/entities/ClassAttendance'
import { Commission } from '../../../teachers/domain/entities/Commission'
import { StudentsAttendancePub } from '../../../teachers/domain/publisher/StudentsAttendance'
import { CommissionVO } from '../../../teachers/domain/value-objects/Commission.vo'
import { DateVO } from '../../../teachers/domain/value-objects/Date.vo'
import { MainTeacherVO } from '../../../teachers/domain/value-objects/MainTeacher.vo'
import { SubjectVO } from '../../../teachers/domain/value-objects/Subject.vo'

import { successResponse } from '../../http-response/successResponse'

/**
   @inject 
   @interface Publisher
*/
@injectable()
export class StudentsAttendanceController {

    constructor(
        @inject(ContainerSymbols.GCPPubSub)
        private readonly pubsub: Publisher
    ) { }

    async run(req: Request, res: Response, next: NextFunction) {
        const { sheetId, teacher, commission, subject, date } = req.body

        try {

            const com = Commission.create(
                MainTeacherVO.build(teacher),
                CommissionVO.build(commission),
                SubjectVO.build(subject)
            )

            const classAttendance = ClassAttendance.create({
                studentsClass: com,
                date: DateVO.build(date)
            })

            const msg: StudentsAttendancePub = {
                sheetId,
                classAttendance: classAttendance.toPrimitives()
            }

            await this.pubsub.publishJSON('students_attendance', msg)
            logger.info(' Message Published 📩')


            return successResponse(res)
        } catch (err) {
            return next(err)
        }
    }
}