import { EmailVO } from '../../../shared/domain/value-objects/Email.vo'

export class Student {

    private constructor(
        public name: string,
        public surname: string,
        public record: string,
        public email?: EmailVO
    ) { }

    static create({
        name,
        surname,
        record,
        email
    }: {
        name: string,
        surname: string,
        record: string,
        email?: EmailVO
    }
    ) {

        return new Student(
            name,
            surname,
            record,
            email
        )
    }

    toPrimitives() {
        return {
            name: this.name,
            surname: this.surname,
            record: this.record,
            email: this.email?.value,

        }
    }
}