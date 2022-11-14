
import { Commission } from './Commission'

export class Assistant {
    /**
     * 
     * @param name 
     * @param isTeacher 
     * @param commissionSubscription 
     */
    private constructor(
        public name: string,
        public commissionSubscription?: Commission,
        public isTeacher: boolean = false,
    ) { }

    static create({
        name,
        commissionSubscription
    }: {
        name: string,
        commissionSubscription?: Commission
    }
    ) {

        return new Assistant(name, commissionSubscription)
    }

    toPrimitives() {
        return {
            name: this.name,
            commissionSubscription: this.commissionSubscription?.toPrimitives()
        }
    }
}