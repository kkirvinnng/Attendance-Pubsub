/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { initializeApp } from 'firebase-admin/app'
import * as admin from 'firebase-admin'
import { getAuth } from 'firebase-admin/auth'
import { getDatabase } from './database'
import { firebaseConfig } from './serviceAccount.credentials'


// Initialize Firebase
export const firebaseApp = initializeApp({
    credential: admin.credential.cert(firebaseConfig),
    databaseURL: process.env.FB_DB_URL,
})

/**
*   Firebase Auth 
*/
export const auth = getAuth(firebaseApp)

/**
*   Firebase Database 
*/
export const database = getDatabase(firebaseApp)

export default {
    auth,
    database
}