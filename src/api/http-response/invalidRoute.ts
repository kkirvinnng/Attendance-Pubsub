import { Response, Request } from 'express'
import { errorFormat } from './errors/errorFormat'
import { NotFound } from './errors/HttpExceptions'


const invalidRoute = (_: Request, res: Response) => {
    const errFormat = errorFormat(new NotFound('Invalid route'))

    return res.status(errFormat.error.code).json(errFormat)
}

export default invalidRoute