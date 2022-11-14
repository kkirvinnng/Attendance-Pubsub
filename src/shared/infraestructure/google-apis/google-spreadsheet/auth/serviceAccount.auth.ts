import { GoogleSpreadsheet } from 'google-spreadsheet'
import { SpreadsheetServiceAccountException } from '../../../../../teachers/infraestructure/errors/SpreadsheetServiceAccountException'
import cred from '../../credentials/serviceAccount.credentials'

const serviceAccountAuth = async (document: GoogleSpreadsheet) => {

    try {
        await document.useServiceAccountAuth({
            client_email: cred.client_id!,
            private_key: cred.private_key!
        })

    } catch (e) {
        throw new SpreadsheetServiceAccountException('Error when trying to authenticate with the service account')
    }
}

export { serviceAccountAuth }
