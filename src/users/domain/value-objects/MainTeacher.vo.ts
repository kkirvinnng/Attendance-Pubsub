import { isNullable } from '../../../shared/domain/isNullable'
import { InvalidFormatVO } from '../../../shared/domain/value-objects/InvalidFormatVO'
import { ValueObject } from '../../../shared/domain/value-objects/ValueObject'

export class MainTeacherVO extends ValueObject<string>{

    constructor(teacher: string) {
        super(teacher)
        this.assertIsValid(teacher)
    }

    protected assertIsValid(teacher: string) {
        if (isNullable(teacher)) {
            throw new InvalidFormatVO('Value must be defined')
        }

    }

    static build(teacher: string): MainTeacherVO {
        return new MainTeacherVO(teacher)
    }
}