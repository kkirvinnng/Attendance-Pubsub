import { DriveService } from '../../../src/teachers/domain/services/drive/DriveService'
import { FileClonProps } from '../../../src/teachers/domain/services/drive/FileClonProps'

export class DriveServiceMock implements DriveService {

    private mockSave = jest.fn()
    private mockRemove = jest.fn()

    async createSpreadsheetByTeacher(name: string): Promise<FileClonProps> {
        this.mockSave(name)
        const fileMock: FileClonProps = {
            fileId: '1',
            name
        }
        return fileMock
    }
    async deleteSpreadsheetByTeacher(name: string): Promise<void> {
        this.mockRemove(name)
    }

    assertSaveHasBeenCalled() {
        expect(this.mockSave).toHaveBeenCalled()
    }

    assertRemoveHasBeenCalled() {
        expect(this.mockRemove).toHaveBeenCalled()
    }
}