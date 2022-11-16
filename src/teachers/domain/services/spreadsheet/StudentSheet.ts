import { ClassPrimitives } from '../../../../shared/types/ClassMethodsAndProperties'
import { ClassAttendance } from '../../entities/ClassAttendance'
import { Student } from '../../entities/Student'

export interface StudentSheet {
    readStudents(sheetId: string): Promise<{
        sheetTitle: string;
        studentsFromSheet: Student[];
    }[]>

    writeStudentsAttendance(
        sheetId: string,
        students: Student[],
        classAttendance: ClassPrimitives<ClassAttendance>
    ): Promise<void>
}