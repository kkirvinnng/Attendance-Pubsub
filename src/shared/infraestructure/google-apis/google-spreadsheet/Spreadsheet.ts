import { GoogleSpreadsheet } from 'google-spreadsheet'
import { LoadSpreadsheetException } from '../../../../users/infraestructure/errors/LoadSpreadsheetException'
import { serviceAccountAuth } from './auth/serviceAccount.auth'


export class Spreadsheet {

    /**
     * Get the Spreadsheet Instance by the ID in the document URL
     * @param sheetId document ID from the URL of the Spreadsheet
     * @returns GoogleSpreadsheet instance
     */
    static async findById(sheetId: string): Promise<GoogleSpreadsheet> {

        const doc = new GoogleSpreadsheet(sheetId)

        await serviceAccountAuth(doc)
        await this.loadSpreadsheet(doc)

        return doc
    }

    private static async loadSpreadsheet(spreadsheet: GoogleSpreadsheet): Promise<void> {
        try {
            await spreadsheet.loadInfo()

        } catch (e: unknown) {
            throw new LoadSpreadsheetException('Error loading basic Spreadsheet document properties and child worksheets')
        }
    }
} 