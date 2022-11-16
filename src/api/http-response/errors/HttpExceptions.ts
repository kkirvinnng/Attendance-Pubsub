import {
    BAD_REQUEST,
    NOT_FOUND,
    UNAUTHORIZED,
    FORBIDDEN,
    NOT_IMPLEMENTED
} from '../httpStatusCode'

export class ApiError extends Error {

    constructor(
        public name: string,
        public statusCode: number
    ) {
        super(name)
        this.name = name
        this.statusCode = statusCode
    }
}

export class BadRequest extends ApiError {
    constructor(
        name: string,
        statusCode: number = BAD_REQUEST,

    ) {
        super(name, statusCode)
    }
}

export class NotFound extends ApiError {
    constructor(
        name: string,
        statusCode: number = NOT_FOUND,

    ) {
        super(name, statusCode)
    }
}

export class Unauthorized extends ApiError {
    constructor(
        name: string,
        statusCode: number = UNAUTHORIZED,

    ) {
        super(name, statusCode)
    }
}

export class Forbidden extends ApiError {
    constructor(
        name: string,
        statusCode: number = FORBIDDEN,

    ) {
        super(name, statusCode)
    }
}

export class NotImplemented extends ApiError {
    constructor(
        name: string,
        statusCode: number = NOT_IMPLEMENTED,
    ) {
        super(name, statusCode)
    }
}
