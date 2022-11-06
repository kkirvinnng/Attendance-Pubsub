/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { ServiceAccount } from 'firebase-admin/app'

export const firebaseConfig: ServiceAccount = {
    projectId: process.env.FB_PROJECT_ID!,
    clientEmail: process.env.FB_CLIENT_EMAIL!,
    privateKey: process.env.FB_PRIVATE_KEY?.replace(/\\n/g!, '\n')!,
}