import { Assistant } from '../entities/Assistant'
import { TeacherStatus } from '../types/TeacherStatus'

export interface AssistantRepository {

    createAssistant({ name, isTeacher }: Assistant): Promise<void | null>

    deleteAssistant(name: string): Promise<void | null>

    changeAssistantStatus(name: string, status: TeacherStatus): Promise<void>

    assignSubject(assistant: Assistant): Promise<void | null>

}