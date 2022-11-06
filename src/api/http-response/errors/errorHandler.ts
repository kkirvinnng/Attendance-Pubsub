import { NextFunction, Request, Response } from 'express'
import { AppError } from '../../../shared/application/errors/AppError'
import { INTERNAL_ERROR } from '../httpStatusCode'
import { errorFormat } from './errorFormat'
import logger from '../../../shared/infraestructure/logger/Winston'

export const errorHandler = (
    err: Error,
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!err) return next()

    if (err instanceof AppError) {
        logger.error(`❗ ${err.message}: ${err.name}`)
        const errorResponse = errorFormat(err)
        return res.status(err.statusCode!).json(errorResponse)
    }

    logger.error('Unhandled 👎:', err)
    return res.status(INTERNAL_ERROR).json({ success: false, error: err })
}
