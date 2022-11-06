import { AppError } from '../../../shared/application/errors/AppError'
import {
    BAD_REQUEST,
    NOT_FOUND,
    UNAUTHORIZED,
    FORBIDDEN,
    NOT_IMPLEMENTED
} from '../httpStatusCode'

export class BadRequest extends AppError {
    constructor(
        name: string,
        statusCode: number = BAD_REQUEST,

    ) {
        super(name, statusCode)
    }
}

export class NotFound extends AppError {
    constructor(
        name: string,
        statusCode: number = NOT_FOUND,

    ) {
        super(name, statusCode)
    }
}

export class Unauthorized extends AppError {
    constructor(
        name: string,
        statusCode: number = UNAUTHORIZED,

    ) {
        super(name, statusCode)
    }
}

export class Forbidden extends AppError {
    constructor(
        name: string,
        statusCode: number = FORBIDDEN,

    ) {
        super(name, statusCode)
    }
}

export class NotImplemented extends AppError {
    constructor(
        name: string,
        statusCode: number = NOT_IMPLEMENTED,
    ) {
        super(name, statusCode)
    }
}
