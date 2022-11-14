import { inject, injectable } from 'inversify'
import { ContainerSymbols } from '../../../dependency-injection/symbols'
import { AppStatusTitle } from '../../../shared/domain/constants'
import { Spreadsheet } from '../../../shared/infraestructure/google-apis/google-spreadsheet/Spreadsheet'
import { ClassPrimitives } from '../../../shared/types/ClassMethodsAndProperties'
import { Commission } from '../../domain/entities/Commission'
import { TeacherRepository } from '../../domain/repositories/TeacherRepository'
import { TeacherSpreadsheet } from './TeacherSpreadsheet'
import logger from '../../../shared/infraestructure/logger/Winston'


@injectable()
export class TeacherSpreadsheetService {

    constructor(
        @inject(ContainerSymbols.FirebaseTeacherRepository)
        private readonly teacherRepository: TeacherRepository,
    ) { }

    async duplicateSheetBySubject(sheetId: string, commissionProps: ClassPrimitives<Commission>): Promise<void> {

        const { teacher } = commissionProps

        logger.info('Initializing spreadsheet and cloning the "Base" sheet...')
        const spreadsheet = await Spreadsheet.findById(sheetId)

        const doc = new TeacherSpreadsheet(spreadsheet)
        await doc.duplicateSheet(commissionProps)

        const status = await this.teacherRepository.getTeacherStatus(teacher)
        if (status < AppStatusTitle.spreadsheetDuplicated) {
            await this.teacherRepository.changeTeacherStatus(teacher, AppStatusTitle.spreadsheetDuplicated)
        }
        logger.info('Sheet duplicated correctly ✅')
    }

}