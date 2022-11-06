import { Assistant } from '../../../src/users/domain/entities/Assistant'
import { AssistantRepository } from '../../../src/users/domain/repositories/AssistantRepository'
import { TeacherStatus } from '../../../src/users/domain/types/TeacherStatus'

export class FirebaseAssistantRepositoryMock implements AssistantRepository {

    private mockSave = jest.fn()
    private mockRemove = jest.fn()
    private mockStatus = jest.fn()
    private mockAssign = jest.fn()
    private assistants: Array<Assistant> = []

    async createAssistant(assistant: Assistant): Promise<void | null> {
        this.mockSave(assistant)

        const found = this.assistants.find(t => t.name === assistant.name)

        if (found) {
            return null
        }

        this.assistants.push(assistant)
    }

    async deleteAssistant(name: string): Promise<void | null> {
        this.mockRemove(name)

        const found = this.assistants.find(assistant => assistant.name === name)
        if (!found) {
            return null
        }

        this.assistants.pop()
    }

    async changeAssistantStatus(name: string, status: TeacherStatus): Promise<void> {
        this.mockStatus(status)
    }

    async assignSubject(assistant: Assistant): Promise<void | null> {
        this.mockAssign(assistant)

        const found = this.assistants.find(t => t.name === assistant.name)

        if (!found) {
            return null
        }
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

    assertAssignHasBeenCalledWithAssistant(assistant: Assistant) {
        expect(this.mockAssign).toHaveBeenCalledWith(assistant)
    }
}