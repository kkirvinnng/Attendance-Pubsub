import { EmailVO } from '../../../shared/domain/value-objects/Email.vo'
import { FirebaseDataSource } from '../../../shared/infraestructure/persistence/FirebaseDataSource'
import { ClassPrimitives } from '../../../shared/types/ClassMethodsAndProperties'
import { KeyAsString } from '../../../shared/types/KeyAsString'
import { ClassAttendance } from '../../domain/entities/ClassAttendance'
import { Student } from '../../domain/entities/Student'
import { StudentsRepository } from '../../domain/repositories/StudentsRepository'



export class FirebaseStudentsRepository extends FirebaseDataSource
    implements StudentsRepository {


    private toDomain({
        nombre,
        apellido,
        legajo,
        email
    }: {
        nombre: string,
        apellido: string,
        legajo: string,
        email?: string
    }) {

        return Student.create({
            name: nombre,
            surname: apellido,
            record: legajo,
            email: email ? new EmailVO(email) : undefined
        })
    }

    private toPersistence(student: Student) {
        const primitives = student.toPrimitives()
        return {
            nombre: primitives.name,
            apellido: primitives.surname,
            legajo: primitives.record,
            email: primitives.email
        }
    }

    async writeStudents(teacher: string, sheetTitle: string, students: Student[]): Promise<void> {
        const path = teacher.concat('/', sheetTitle)

        const recordAsKey: KeyAsString = {}
        for (const student of students) {
            const record = student.record
            const persistence = this.toPersistence(student)
            recordAsKey[record] = persistence
        }

        return super.update(path, recordAsKey)
    }

    async getStudentsClassAttendance(classAttendance: ClassPrimitives<ClassAttendance>): Promise<Student[] | null> {

        const { studentsClass, date } = classAttendance
        const { teacher, commission, subject } = studentsClass

        const path = `/${teacher}/${commission}/${subject}/asistencias/${date}`

        const firebaseStudents = await super.get(path)

        if (!firebaseStudents) return null

        //deleting id keys
        const firebaseStudentsValues: Array<any> = Object.values(firebaseStudents)

        const domainStudents: Array<Student> = firebaseStudentsValues.map(student => {
            return this.toDomain(student)
        })

        return domainStudents
    }
}