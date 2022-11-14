import { google } from 'googleapis'
import cred from '../../../../shared/infraestructure/google-apis/credentials/serviceAccount.credentials'

const scopes = [
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/drive.appdata',
    'https://www.googleapis.com/auth/drive.file'
]

export const serviceAccountAuthWithJWT = () => {
    const auth = new google.auth.JWT(cred.client_id, undefined, cred.private_key, scopes)

    return auth
}
