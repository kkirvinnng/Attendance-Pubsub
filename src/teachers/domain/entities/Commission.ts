import { CommissionVO } from '../value-objects/Commission.vo'
import { MainTeacherVO } from '../value-objects/MainTeacher.vo'
import { SubjectVO } from '../value-objects/Subject.vo'

export class Commission {
    /**
     * 
     * @param teacher 
     * @param commission 
     * @param subject 
     */
    private constructor(
        public teacher: MainTeacherVO,
        public commission: CommissionVO,
        public subject: SubjectVO,
    ) { }

    static create(
        teacher: MainTeacherVO,
        commission: CommissionVO,
        subject: SubjectVO
    ) {
        return new Commission(teacher, commission, subject)
    }

    toPrimitives() {

        return {
            teacher: this.teacher.value,
            commission: this.commission.value,
            subject: this.subject.value
        }
    }
}