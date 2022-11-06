import { AppError } from '../../../shared/application/errors/AppError'

export interface ErrorResponse {

    title: string,
    message: string,
    code: number
}

export interface ApiErrorResponse {
    success: boolean,
    error: ErrorResponse
}

const errorFormat = (e: AppError): ApiErrorResponse => {
    const err: ErrorResponse = {
        title: e.message,
        message: e.name,
        code: e.statusCode!
    }
    return {
        success: false,
        error: err
    }
}

export { errorFormat }