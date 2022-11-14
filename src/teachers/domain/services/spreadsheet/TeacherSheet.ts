import { ClassPrimitives } from '../../../../shared/types/ClassMethodsAndProperties'
import { Commission } from '../../entities/Commission'

export interface TeacherSheet {
    duplicateSheetBySubject(sheetId: string, commissionProps: Omit<ClassPrimitives<Commission>, 'teacher'>): Promise<void>
}