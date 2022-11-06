import { FileClonProps } from './FileClonProps'

export interface DriveService {
    createSpreadsheetByTeacher(name: string): Promise<FileClonProps>
    deleteSpreadsheetByTeacher(name: string): Promise<void>
}