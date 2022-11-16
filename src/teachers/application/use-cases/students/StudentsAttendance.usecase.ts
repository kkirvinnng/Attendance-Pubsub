import { injectable, inject } from 'inversify'
import { ContainerSymbols } from '../../../../dependency-injection/symbols'
import logger from '../../../../shared/infraestructure/logger/Winston'
import { ClassAttendance } from '../../../domain/entities/ClassAttendance'
import { StudentsRepository } from '../../../domain/repositories/StudentsRepository'
import { StudentSheet } from '../../../domain/services/spreadsheet/StudentSheet'
import { StudentsClassAttendanceNotFound } from '../../errors/StudentsClassAttendanceNotFound'


/**
   @inject 
   @interface StudentsRepository
   @interface StudentSheet
*/
@injectable()
export class StudentsAttendanceUseCase {

    constructor(
        @inject(ContainerSymbols.FirebaseStudentsRepository)
        private readonly studentsRepository: StudentsRepository,
        @inject(ContainerSymbols.StudentsSpreadsheetService)
        private readonly studentsSpreadsheet: StudentSheet,
    ) { }

    async run(sheetId: string, attendance: ClassAttendance) {

        const attendancePrimitives = attendance.toPrimitives()

        const students = await this.studentsRepository.getStudentsClassAttendance(attendancePrimitives)

        if (!students) {
            throw new StudentsClassAttendanceNotFound('Student attendance wasnt found.')
        }

        await this.studentsSpreadsheet.writeStudentsAttendance(
            sheetId,
            students,
            attendancePrimitives
        )

        logger.info('Students successfully uploaded ✅')
    }
}