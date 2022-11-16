import { injectable } from 'inversify'
import logger from '../../../../shared/infraestructure/logger/Winston'
import { ClassPrimitives } from '../../../../shared/types/ClassMethodsAndProperties'
import { ClassAttendance } from '../../../domain/entities/ClassAttendance'
import { Student } from '../../../domain/entities/Student'
import { StudentsSpreadsheet } from '../StudentsSpreadsheet'

@injectable()
export class StudentsSpreadsheetService {

    async readStudents(sheetId: string): Promise<{
        sheetTitle: string;
        studentsFromSheet: Student[];
    }[]> {

        const spreadsheet = await StudentsSpreadsheet.create(sheetId)
        return spreadsheet.readStudents()
    }

    async writeStudentsAttendance(
        sheetId: string,
        students: Student[],
        classAttendance: ClassPrimitives<ClassAttendance>
    ) {
        const spreadsheet = await StudentsSpreadsheet.create(sheetId)

        logger.info('Writing spreadsheet... 📝')

        return spreadsheet.writeClassAttendance(students, classAttendance)
    }
}