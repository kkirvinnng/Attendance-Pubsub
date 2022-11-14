import { injectable, inject } from 'inversify'
import { ContainerSymbols } from '../../../../dependency-injection/symbols'
import { AppStatusTitle } from '../../../../shared/domain/constants'
import logger from '../../../../shared/infraestructure/logger/Winston'
import { ClassPrimitives } from '../../../../shared/types/ClassMethodsAndProperties'
import { Commission } from '../../../domain/entities/Commission'
import { TeacherRepository } from '../../../domain/repositories/TeacherRepository'
import { TeacherSheet } from '../../../domain/services/spreadsheet/TeacherSheet'


/**
   @inject 
   @interface TeacherRepository
   @interface TeacherSheet
*/
@injectable()
export class AssignCommissionSheetUseCase {

    constructor(
        @inject(ContainerSymbols.FirebaseTeacherRepository)
        private readonly teacherRepository: TeacherRepository,
        @inject(ContainerSymbols.TeacherSpreadsheetService)
        private readonly teacherSpreadsheet: TeacherSheet,
    ) { }

    async run(sheetId: string, props: ClassPrimitives<Commission>) {

        await this.teacherSpreadsheet.duplicateSheetBySubject(sheetId, props)

        const status = await this.teacherRepository.getTeacherStatus(props.teacher)

        if (status < AppStatusTitle.spreadsheetDuplicated) {
            await this.teacherRepository.changeTeacherStatus(props.teacher, AppStatusTitle.spreadsheetDuplicated)
        }
        logger.info('Sheet duplicated correctly ✅')
    }
}