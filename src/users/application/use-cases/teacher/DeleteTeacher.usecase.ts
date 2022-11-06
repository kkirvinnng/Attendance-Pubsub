import { injectable, inject } from 'inversify'
import { ContainerSymbols } from '../../../../dependency-injection/symbols'
import { cutEmail } from '../../../../shared/domain/cutEmail'
import logger from '../../../../shared/infraestructure/logger/Winston'
import { TeacherRepository } from '../../../domain/repositories/TeacherRepository'
import { DriveService } from '../../../domain/services/drive/DriveService'
import { TeacherNotFound } from '../../errors/TeacherNotFound'

/**
   @inject 
   @interface TeacherRepository
   @interface DriveService
*/
@injectable()
export class DeleteTeacherUseCase {

    constructor(
        @inject(ContainerSymbols.FirebaseTeacherRepository)
        private readonly teacherRepository: TeacherRepository,
        @inject(ContainerSymbols.GoogleDriveService)
        private readonly driveService: DriveService
    ) { }

    async run(email: string) {

        const emailCuted = cutEmail(email)

        const checkNull = await this.teacherRepository.deleteTeacher(emailCuted)

        if (checkNull === null) {
            throw new TeacherNotFound(`the teacher ${email} doesn't exists in the database`)
        }

        logger.info('Teacher data deleted ✅')

        await this.driveService.deleteSpreadsheetByTeacher(emailCuted)

        logger.info('Spreadsheet deleted ✅')

    }
}