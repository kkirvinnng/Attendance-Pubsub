import { CommissionVO } from '../value-objects/Commission.vo'
import { MainTeacherVO } from '../value-objects/MainTeacher.vo'
import { SubjectVO } from '../value-objects/Subject.vo'

export class AssistantCommission {
    /**
     * 
     * @param mainTeacher 
     * @param commission 
     * @param subject 
     */
    private constructor(
        public mainTeacher: MainTeacherVO,
        public commission: CommissionVO,
        public subject: SubjectVO,
    ) { }

    static create(
        mainTeacher: MainTeacherVO,
        commission: CommissionVO,
        subject: SubjectVO
    ) {
        return new AssistantCommission(mainTeacher, commission, subject)
    }
}