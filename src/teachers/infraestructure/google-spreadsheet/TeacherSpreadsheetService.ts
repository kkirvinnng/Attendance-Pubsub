import { injectable } from 'inversify'
import { ClassPrimitives } from '../../../shared/types/ClassMethodsAndProperties'
import { Commission } from '../../domain/entities/Commission'
import logger from '../../../shared/infraestructure/logger/Winston'
import { TeacherSheet } from '../../domain/services/spreadsheet/TeacherSheet'
import { TeacherSpreadsheet } from './TeacherSpreadsheet'


@injectable()
export class TeacherSpreadsheetService implements TeacherSheet {

    async duplicateSheetBySubject(
        sheetId: string,
        commissionProps: Omit<ClassPrimitives<Commission>, 'teacher'>
    ): Promise<void> {

        logger.info('Initializing spreadsheet and cloning the "Base" sheet...')
        const doc = await TeacherSpreadsheet.create(sheetId)

        await doc.duplicateSheet(commissionProps)

    }
}