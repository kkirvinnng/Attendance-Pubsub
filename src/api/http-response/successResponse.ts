import { Response } from 'express'
import { OK } from './httpStatusCode'

export const successResponse = (res: Response) => {
    return res.status(OK).json({ success: true, message: 'Ok' })
}