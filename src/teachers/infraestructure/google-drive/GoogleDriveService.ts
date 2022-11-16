import { injectable } from 'inversify'
import { DriveService } from '../../domain/services/drive/DriveService'
import { FileClonProps } from '../../domain/services/drive/FileClonProps'
import { GoogleDrive } from './GoogleDrive'
import { TeacherBaseSpreadsheetTitle as BASE_TITLE } from '../../domain/services/drive/constants'
import { Spreadsheet } from '../../../shared/infraestructure/google-apis/google-spreadsheet/Spreadsheet'
import logger from '../../../shared/infraestructure/logger/Winston'


@injectable()
export class GoogleDriveService extends GoogleDrive
    implements DriveService {

    async createSpreadsheetByTeacher(name: string): Promise<FileClonProps> {

        const file = await super.clonBaseSpreadsheet()
        logger.info('Cloned base spreadsheet ✅')

        const spreadsheet = await Spreadsheet.findById(file.fileId)
        const doc = spreadsheet.googleSpreadsheet
        await doc.updateProperties({ title: `${BASE_TITLE}${name}` })

        return file
    }

    async deleteSpreadsheetByTeacher(name: string): Promise<void> {
        await super.deleteDuplicateFiles(`${BASE_TITLE}${name}`)
    }
}