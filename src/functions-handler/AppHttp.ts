import * as functions from 'firebase-functions'
import app from '../api'

export const AppHttp = functions
    .runWith({ memory: '256MB', timeoutSeconds: 300 })
    .https.onRequest(app)