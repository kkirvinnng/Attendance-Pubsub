import { EmailVO } from '../value-objects/Email.vo'

export class Teacher {
    /**
    * Constructor
    * @param name 
    * @param email 
    * @param idSheet 
    */
    private constructor(
        public name: string,
        public email: EmailVO,
        public idSheet: string

    ) { }

    static create({
        name,
        email,
        idSheet
    }: {
        name: string,
        email: EmailVO,
        idSheet: string
    }
    ) {
        return new Teacher(name, email, idSheet)
    }

    toPrimitives() {

        return {
            name: this.name,
            email: this.email.value,
            idSheet: this.idSheet
        }
    }
}