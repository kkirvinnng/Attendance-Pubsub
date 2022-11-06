import { isNullable } from '../../../shared/domain/isNullable'
import { InvalidFormatVO } from '../../../shared/domain/value-objects/InvalidFormatVO'
import { ValueObject } from '../../../shared/domain/value-objects/ValueObject'

export class SubjectVO extends ValueObject<string>{

    constructor(subject: string) {
        super(subject)
        this.assertIsValid(subject)
    }

    protected assertIsValid(subject: string) {
        if (isNullable(subject)) {
            throw new InvalidFormatVO('Subject value must be defined')
        }
    }

    static build(subject: string): SubjectVO {
        return new SubjectVO(subject)
    }
}