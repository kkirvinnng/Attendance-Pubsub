import { AssistantCommission } from './AssistantCommission'

export class Assistant {
    /**
     * 
     * @param name 
     * @param commission 
     * @param subject 
     */
    private constructor(
        public name?: string,
        public isTeacher?: boolean,
        public commissionSubscription?: AssistantCommission,
    ) { }

    static create({
        name,
        isTeacher,
        commissionSubscription
    }: {
        name?: string,
        isTeacher?: boolean,
        commissionSubscription?: AssistantCommission
    }
    ) {
        return new Assistant(name, isTeacher, commissionSubscription)
    }
}