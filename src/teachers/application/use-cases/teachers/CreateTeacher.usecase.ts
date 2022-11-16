import { injectable, inject } from 'inversify'
import { ContainerSymbols } from '../../../../dependency-injection/symbols'
import { cutEmail } from '../../../../shared/domain/cutEmail'
import logger from '../../../../shared/infraestructure/logger/Winston'
import { Teacher } from '../../../domain/entities/Teacher'
import { TeacherRepository } from '../../../domain/repositories/TeacherRepository'
import { DriveService } from '../../../domain/services/drive/DriveService'
import { EmailVO } from '../../../../shared/domain/value-objects/Email.vo'
import { TeacherAlreadyExists } from '../../errors/TeacherAlreadyExists'


/**
   @inject 
   @interface TeacherRepository
   @interface DriveService
*/
@injectable()
export class CreateTeacherUseCase {

    constructor(
        @inject(ContainerSymbols.FirebaseTeacherRepository)
        private readonly teacherRepository: TeacherRepository,
        @inject(ContainerSymbols.GoogleDriveService)
        private readonly driveService: DriveService
    ) { }

    /**
     * Save the teacher in the database and create the corresponding spreadsheet
     * @param email
     */
    async run(email: string) {

        const emailVO = EmailVO.build(email)

        const emailCuted = cutEmail(email)


        //* Create Spreadsheet
        const fileProps = await this.driveService.createSpreadsheetByTeacher(emailCuted)

        logger.info('Initialized teacher spreadsheet ✅')


        const teacher = Teacher.create({
            name: emailCuted,
            email: emailVO,
            idSheet: fileProps.fileId
        })

        const res = await this.teacherRepository.createTeacher(teacher)

        if (res === null) {
            throw new TeacherAlreadyExists(`The teacher ${email} already exists in the database`)
        }

        logger.info('Teacher created ✅')

        await this.teacherRepository.changeTeacherStatus(emailCuted, '1')
    }
}