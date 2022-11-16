import { Spreadsheet } from '../../../shared/infraestructure/google-apis/google-spreadsheet/Spreadsheet'
import { ClassPrimitives } from '../../../shared/types/ClassMethodsAndProperties'
import { Commission } from '../../domain/entities/Commission'
import { SUBNAME_SHEET, BASE_SHEET } from '../../domain/services/drive/constants'
import { SheetAlreadyExistsException } from '../errors/SheetAlreadyExistsException'

export class TeacherSpreadsheet {

    private constructor(public readonly Ss: Spreadsheet) { }

    static async create(sheetId: string) {
        const spreadsheet = await Spreadsheet.findById(sheetId)

        return new TeacherSpreadsheet(spreadsheet)
    }

    async duplicateSheet(commissionProps: Omit<ClassPrimitives<Commission>, 'teacher'>): Promise<void> {
        const { commission, subject } = commissionProps
        const sheetTitle = `${commission}/${subject}/${SUBNAME_SHEET}`

        //*change the name of the base sheet

        const baseSheet = this.Ss.getSheetByTitle(BASE_SHEET)
        const checkSheet = this.Ss.getSheetByTitle(sheetTitle)

        if (!checkSheet) {
            await baseSheet.updateProperties({ title: sheetTitle })
        } else {

            throw new SheetAlreadyExistsException(`The sheet "${sheetTitle}" already exists`)
        }

        //* copy the sheet
        await baseSheet.copyToSpreadsheet(this.Ss.googleSpreadsheet.spreadsheetId)

        //* once it is copied. Put the original name
        await baseSheet.updateProperties({ title: BASE_SHEET, hidden: true })

        //* Remove the name 'Copia de ...' 
        const clonSheet = this.Ss.getSheetByTitle(`Copia de ${sheetTitle}`)
        await clonSheet.updateProperties({
            title: sheetTitle,
            hidden: false
        })
    }
}
