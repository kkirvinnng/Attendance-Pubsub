import { ClassPrimitives } from '../../../shared/types/ClassMethodsAndProperties'
import { ClassAttendance } from '../entities/ClassAttendance'
import { Student } from '../entities/Student'

export interface StudentsRepository {

    writeStudents(teacher: string, sheetTitle: string, students: Student[]): Promise<void>

    getStudentsClassAttendance(classAttendance: ClassPrimitives<ClassAttendance>): Promise<Student[] | null>
}