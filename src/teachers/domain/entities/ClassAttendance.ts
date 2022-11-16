import { DateVO } from '../value-objects/Date.vo'
import { Commission } from './Commission'

export class ClassAttendance {
    /**
     * 
     * @param studentsClass 
     * @param date 
     */
    private constructor(
        public studentsClass: Commission,
        public date: DateVO,
    ) { }

    static create({
        studentsClass,
        date
    }: {
        studentsClass: Commission,
        date: DateVO
    }
    ) {
        return new ClassAttendance(studentsClass, date)
    }

    toPrimitives() {

        return {
            studentsClass: this.studentsClass.toPrimitives(),
            date: this.date.value
        }
    }
}