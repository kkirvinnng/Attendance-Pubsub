import { isNullable } from '../../../shared/domain/isNullable'
import { InvalidFormatVO } from '../../../shared/domain/value-objects/InvalidFormatVO'
import { ValueObject } from '../../../shared/domain/value-objects/ValueObject'

export class CommissionVO extends ValueObject<string>{

    constructor(commission: string) {
        super(commission)
        this.assertIsValid(commission)
    }

    protected assertIsValid(commission: string) {
        if (isNullable(commission)) {
            throw new InvalidFormatVO('Commission value must be defined')
        }

        if (!commission.includes('-')) {
            throw new InvalidFormatVO('Invalid Commission Value Object')
        }
    }

    static build(commission: string): CommissionVO {

        return new CommissionVO(commission)
    }
}