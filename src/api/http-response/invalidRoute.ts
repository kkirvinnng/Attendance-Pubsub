import { Response, Request } from 'express'
import { errorFormat } from './errors/errorFormat'
import { NotFound } from './errors/HttpExceptions'
import { NOT_FOUND } from './httpStatusCode'


const invalidRoute = (_: Request, res: Response) => {
    const errFormat = errorFormat(new NotFound('Invalid route'))

    return res.status(NOT_FOUND).json(errFormat)
}

export default invalidRoute