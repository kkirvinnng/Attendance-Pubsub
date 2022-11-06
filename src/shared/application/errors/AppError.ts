
export class AppError extends Error {

    constructor(
        public name: string,
        public statusCode?: number
    ) {
        super(name)
        this.name = name
        this.statusCode = statusCode
    }
}