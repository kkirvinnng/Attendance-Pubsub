import { NextFunction, Response, Request } from 'express'
import { inject, injectable } from 'inversify'
import { ContainerSymbols } from '../../../dependency-injection/symbols'
import { StudentsAttendanceUseCase } from '../../../teachers/application/use-cases/students/StudentsAttendance.usecase'
import { ClassAttendance } from '../../../teachers/domain/entities/ClassAttendance'
import { Commission } from '../../../teachers/domain/entities/Commission'
import { CommissionVO } from '../../../teachers/domain/value-objects/Commission.vo'
import { DateVO } from '../../../teachers/domain/value-objects/Date.vo'
import { MainTeacherVO } from '../../../teachers/domain/value-objects/MainTeacher.vo'
import { SubjectVO } from '../../../teachers/domain/value-objects/Subject.vo'

import { successResponse } from '../../http-response/successResponse'

/**
   @inject 
   @class StudentsAttendanceUseCase
*/
@injectable()
export class StudentsAttendanceController {

    constructor(
        @inject(ContainerSymbols.StudentsAttendanceUseCase)
        private readonly studentsAttendanceUseCase: StudentsAttendanceUseCase,
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

            await this.studentsAttendanceUseCase.run(sheetId, classAttendance)


            return successResponse(res)
        } catch (err) {
            return next(err)
        }
    }
}