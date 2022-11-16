import { injectable, inject } from 'inversify'
import { ContainerSymbols } from '../../../../dependency-injection/symbols'
import logger from '../../../../shared/infraestructure/logger/Winston'
import { TeacherRepository } from '../../../domain/repositories/TeacherRepository'
import { StudentsRepository } from '../../../domain/repositories/StudentsRepository'
import { StudentsSpreadsheetService } from '../../../infraestructure/google-spreadsheet/StudentsSpreadsheetService'
import { AppStatusTitle } from '../../../../shared/domain/constants'


/**
   @inject 
   @interface StudentsRepository
   @interface TeacherRepository
   @interface StudentSheet
*/
@injectable()
export class LoadStudentsUseCase {

    constructor(
        @inject(ContainerSymbols.FirebaseStudentsRepository)
        private readonly studentsRepository: StudentsRepository,
        @inject(ContainerSymbols.FirebaseTeacherRepository)
        private readonly teacherRepository: TeacherRepository,
        @inject(ContainerSymbols.StudentsSpreadsheetService)
        private readonly studentsSpreadsheet: StudentsSpreadsheetService,
    ) { }

    async run(teacher: string, sheetId: string) {

        logger.info('Reading spreadsheet... 📝 ')


        const studentSheets = await this.studentsSpreadsheet.readStudents(sheetId)

        await Promise.all(
            studentSheets.map(async (sheet) => {

                //sheetTitle represents the name of the sheet with the path format for firebase
                const { sheetTitle, studentsFromSheet } = sheet
                return this.studentsRepository.writeStudents(teacher, sheetTitle, studentsFromSheet)
            })
        )

        await this.teacherRepository.changeTeacherStatus(teacher, AppStatusTitle.studentsLoaded)

        logger.info('Students successfully uploaded ✅')
    }
}