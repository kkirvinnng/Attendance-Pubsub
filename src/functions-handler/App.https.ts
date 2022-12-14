import * as functions from 'firebase-functions'
import app from '../api'

export const api = functions
    .runWith({ memory: '256MB', timeoutSeconds: 300 })
    .https.onRequest(app)