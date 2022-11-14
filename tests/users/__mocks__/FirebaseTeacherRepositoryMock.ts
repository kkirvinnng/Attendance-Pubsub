import { AppStatus } from '../../../src/shared/types/AppStatus'
import { Teacher } from '../../../src/teachers/domain/entities/Teacher'
import { TeacherRepository } from '../../../src/teachers/domain/repositories/TeacherRepository'

export class FirebaseTeacherRepositoryMock implements TeacherRepository {

    private mockSave = jest.fn()
    private mockRemove = jest.fn()
    private mockStatus = jest.fn()
    private teachers: Array<Teacher> = []

    async createTeacher(teacher: Teacher): Promise<void | null> {
        this.mockSave(teacher)

        const found = this.teachers.find(t => t.name === teacher.name)

        if (found) {
            return null
        }

        this.teachers.push(teacher)
    }

    async deleteTeacher(name: string): Promise<void | null> {
        this.mockRemove(name)

        const found = this.teachers.find(t => t.name === name)

        if (!found) {
            return null
        }

        this.teachers.pop()
    }

    async changeTeacherStatus(name: string, status: AppStatus): Promise<void> {
        this.mockStatus(status)
    }

    getTeacherStatus(name: string): Promise<string> {
        throw new Error(`Method not implemented. ${name}`)
    }

    assertSaveHasBeenCalled() {
        expect(this.mockSave).toHaveBeenCalled()
    }

    assertStatusHasBeenCalled() {
        expect(this.mockStatus).toHaveBeenCalled()
    }

    assertRemoveHasBeenCalled() {
        expect(this.mockRemove).toHaveBeenCalled()
    }
}