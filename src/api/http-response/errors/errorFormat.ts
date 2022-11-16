
export interface ErrorResponse {

    title: string,
    message: string,
}

export interface ApiErrorResponse {
    success: boolean,
    error: ErrorResponse
}

const errorFormat = (e: Error): ApiErrorResponse => {
    const err: ErrorResponse = {
        title: e.message,
        message: e.name,
    }
    return {
        success: false,
        error: err
    }
}

export { errorFormat }