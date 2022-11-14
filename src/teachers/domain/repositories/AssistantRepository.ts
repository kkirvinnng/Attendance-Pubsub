import { Assistant } from '../entities/Assistant'
import { AppStatus } from '../../../shared/types/AppStatus'

export interface AssistantRepository {

    createAssistant({ name, isTeacher }: Assistant): Promise<void | null>

    deleteAssistant(name: string): Promise<void | null>

    changeAssistantStatus(name: string, status: AppStatus): Promise<void>

    assignSubject(assistant: Assistant): Promise<void | null>

}