import { App } from 'firebase-admin/app'
import { Database, getDatabaseWithUrl } from 'firebase-admin/database'
/**
*   Gets the Database service for a given app.
*/
export const getDatabase = (app?: App) => {
    let database: Database
    if (process.env.FUNCTIONS_EMULATOR !== 'true') {
        database = getDatabaseWithUrl(process.env.FB_DB_URL!, app)

    } else {

        database = getDatabaseWithUrl(process.env.FB_DB_TEST_URL!, app)
    }
    return database
}


