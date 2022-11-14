import { Teacher } from '../entities/Teacher'
import { AppStatus } from '../../../shared/types/AppStatus'

export interface TeacherRepository {
    createTeacher(teacher: Teacher): Promise<void | null>
    deleteTeacher(name: string): Promise<void | null>
    /** 
        *   @param name Teacher name
        *   @param status
        *   1. When the user is created
        *   2. When creating the spreadsheet of a subject
        *   3. When students are loaded
    */
    changeTeacherStatus(name: string, status: AppStatus): Promise<void>
    getTeacherStatus(name: string): Promise<string>
}