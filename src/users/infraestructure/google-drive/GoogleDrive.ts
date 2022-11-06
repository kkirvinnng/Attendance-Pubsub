import { FileClonProps } from '../../domain/services/drive/FileClonProps'
import { JWT } from 'google-auth-library'
import { drive_v3, google } from 'googleapis'
import logger from '../../../shared/infraestructure/logger/Winston'
import { serviceAccountAuthWithJWT } from './auth/serviceAccountJWT.auth'
import { injectable } from 'inversify'
import { TeacherSpreadsheetBaseCreation as BASE } from '../../domain/services/drive/constants'



@injectable()
export class GoogleDrive {
    #drive: drive_v3.Drive
    #auth: JWT
    constructor() {
        this.#auth = serviceAccountAuthWithJWT()
        this.#drive = google.drive({ version: 'v3', auth: this.#auth })
    }

    async clonBaseSpreadsheet(): Promise<FileClonProps> {

        const baseFile = await this.getBaseFile()

        const clonFile = await this.#drive.files.copy({
            fileId: baseFile.fileId
        })

        const props: FileClonProps = {
            name: clonFile.data.name!,
            fileId: clonFile.data.id!
        }
        return props
    }

    async getBaseFile(): Promise<FileClonProps> {
        const files = await this.listFiles()

        const baseFile = files.find(file => file.name === BASE.file)
        return baseFile!
    }

    async listFiles(): Promise<FileClonProps[]> {
        const list = await this.#drive.files.list()

        const files = list.data.files?.map(props => {
            const prop: FileClonProps = {
                name: props.name!,
                fileId: props.id!
            }
            return prop
        })
        return files!
    }

    async deleteFile(fileId: string) {
        await this.#drive.files.delete({ fileId })
    }

    async deleteDuplicateFiles(fileMatch?: string) {
        const files = await this.listFiles()
        fileMatch = fileMatch ? fileMatch : BASE.clon

        const deletedFile = []
        for (const file of files) {
            if (file.name.includes(fileMatch)) {
                deletedFile.push(this.deleteFile(file.fileId))
                logger.info('🗑 Deleted File: ', file)
            }
        }
        await Promise.all(deletedFile)

    }
}