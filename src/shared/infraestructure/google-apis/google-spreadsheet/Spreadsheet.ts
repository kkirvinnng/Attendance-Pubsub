import { GoogleSpreadsheet, GoogleSpreadsheetWorksheet } from 'google-spreadsheet'
import { LoadSpreadsheetException } from '../../../../teachers/infraestructure/errors/LoadSpreadsheetException'
import { serviceAccountAuth } from './auth/serviceAccount.auth'


export class Spreadsheet {

    private constructor(public readonly googleSpreadsheet: GoogleSpreadsheet) { }
    /**
     * Get the Spreadsheet Instance by the ID in the document URL
     * @param sheetId document ID from the URL of the Spreadsheet
     * @returns GoogleSpreadsheet instance
     */
    static async findById(sheetId: string): Promise<Spreadsheet> {

        const googleSpreadsheet = new GoogleSpreadsheet(sheetId)

        await serviceAccountAuth(googleSpreadsheet)
        await this.loadSpreadsheet(googleSpreadsheet)

        return new Spreadsheet(googleSpreadsheet)
    }

    getAllSheets = (): GoogleSpreadsheetWorksheet[] => {
        const sheets = this.googleSpreadsheet.sheetsByIndex
        return sheets
    }

    getSheetByTitle = (title: string): GoogleSpreadsheetWorksheet => {

        const sheets = this.googleSpreadsheet.sheetsByTitle[title]
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