import { NotFound } from '../../../api/http-response/errors/HttpExceptions'

export class SheetAlreadyExistsException extends NotFound { }