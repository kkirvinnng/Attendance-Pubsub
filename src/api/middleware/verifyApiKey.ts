import { NextFunction, Request, Response } from 'express'
import crypto from 'node:crypto'

import { errorFormat } from '../http-response/errors/errorFormat'
import { Unauthorized } from '../http-response/errors/HttpExceptions'
import { UNAUTHORIZED } from '../http-response/httpStatusCode'

export const verifyApiKey = (req: Request, res: Response, next: NextFunction) => {
    const body = req.body
    const { apiKey } = body
    let errFormat = errorFormat(
        new Unauthorized('Access denied')
    )

    if (!apiKey) return res.status(UNAUTHORIZED).json(errFormat)

    const expectedApiKey = process.env.API_KEY!
    const hash = crypto.createHash('sha512')
    const authorized = crypto.timingSafeEqual(
        hash.copy().update(apiKey).digest(),
        hash.copy().update(expectedApiKey).digest()
    )
    if (authorized) {
        req.body.apiKey = undefined
        return next()
    } else {
        errFormat = errorFormat(
            new Unauthorized('Incorrect credentials')
        )
        return res.status(UNAUTHORIZED).json(errFormat)
    }
}