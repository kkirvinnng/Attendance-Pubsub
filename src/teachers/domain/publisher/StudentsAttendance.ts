import { ClassPrimitives } from '../../../shared/types/ClassMethodsAndProperties'
import { ClassAttendance } from '../entities/ClassAttendance'

export interface StudentsAttendancePub {
    sheetId: string
    classAttendance: ClassPrimitives<ClassAttendance>
}