import { GoogleSpreadsheet, GoogleSpreadsheetWorksheet } from 'google-spreadsheet'
import { LoadSpreadsheetException } from '../../../../teachers/infraestructure/errors/LoadSpreadsheetException'
import { serviceAccountAuth } from './auth/serviceAccount.auth'


export class Spreadsheet {

    private constructor(public readonly doc: GoogleSpreadsheet) { }
    /**
     * Get the Spreadsheet Instance by the ID in the document URL
     * @param sheetId document ID from the URL of the Spreadsheet
     * @returns GoogleSpreadsheet instance
     */
    static async findById(sheetId: string): Promise<Spreadsheet> {

        const doc = new GoogleSpreadsheet(sheetId)

        await serviceAccountAuth(doc)
        await this.loadSpreadsheet(doc)

        return new Spreadsheet(doc)
    }

    getAllSheets = (): GoogleSpreadsheetWorksheet[] => {
        const sheets = this.doc.sheetsByIndex
        return sheets
    }

    getSheetByTitle = (title: string): GoogleSpreadsheetWorksheet => {

        const sheets = this.doc.sheetsByTitle[title]
        return sheets
    }

    private static async loadSpreadsheet(spreadsheet: GoogleSpreadsheet): Promise<void> {
        try {
            await spreadsheet.loadInfo()

        } catch (e: unknown) {
            throw new LoadSpreadsheetException('Error loading basic Spreadsheet document properties and child worksheets')
        }
    }
} 