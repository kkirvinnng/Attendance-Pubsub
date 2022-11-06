/* eslint-disable @typescript-eslint/no-unused-vars */
import 'reflect-metadata'
import dotenv from 'dotenv'
dotenv.config()

import * as fb from './shared/infraestructure/firebase/index'
fb.default

export * from 'firebase-functions'
