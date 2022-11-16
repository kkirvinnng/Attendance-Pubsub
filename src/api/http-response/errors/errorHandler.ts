import { NextFunction, Request, Response } from 'express'
import { BAD_REQUEST, CONFLICT, INTERNAL_ERROR, NOT_FOUND, UNAUTHORIZED } from '../httpStatusCode'
import { errorFormat } from './errorFormat'
import logger from '../../../shared/infraestructure/logger/Winston'
import { ApiError } from './HttpExceptions'
import { ApplicationUnauthorized } from '../../../shared/application/errors/ApplicationUnauthorized'
import { DomainFormatError } from '../../../shared/domain/errors/DomainFormatError'
import { ApplicationConflict } from '../../../shared/application/errors/ApplicationConflict'
import { ApplicationNotFound } from '../../../shared/application/errors/ApplicationNotFound'

export const errorHandler = (
    err: Error,
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!err) return next()

    const errorResponse = errorFormat(err)

    if (err instanceof ApiError) {

        logger.error(`❗ ${err.message}: ${err.name}`)
        return res.status(err.statusCode).json(errorResponse)
    }

    if (err instanceof DomainFormatError) {

        logger.error(`❗ ${err.message}: ${err.name}`)
        return res.status(BAD_REQUEST).json(errorResponse)
    }

    if (err instanceof ApplicationUnauthorized) {

        logger.error(`❗ ${err.message}: ${err.name}`)
        return res.status(UNAUTHORIZED).json(errorResponse)
    }

    if (err instanceof ApplicationConflict) {

        logger.error(`❗ ${err.message}: ${err.name}`)
        return res.status(CONFLICT).json(errorResponse)
    }

    if (err instanceof ApplicationNotFound) {

        logger.error(`❗ ${err.message}: ${err.name}`)
        return res.status(NOT_FOUND).json(errorResponse)
    }


    logger.error('Unhandled 👎:', err)
    return res.status(INTERNAL_ERROR).json({ success: false, error: err })
}
