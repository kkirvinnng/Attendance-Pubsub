import { isNullable } from '../../../shared/domain/isNullable'
import { InvalidFormatVO } from '../../../shared/domain/value-objects/InvalidFormatVO'
import { ValueObject } from '../../../shared/domain/value-objects/ValueObject'
import { DATE_REGEX } from '../constants'

export class DateVO extends ValueObject<string>{

    constructor(date: string) {
        super(date)
        this.assertIsValid(date)
    }

    protected assertIsValid(date: string) {
        if (isNullable(date)) {
            throw new InvalidFormatVO('Date value must be defined')
        }

        if (date.includes('/')) {
            date = date.split('/').join('-')
        }

        if (!DATE_REGEX.test(date.toString())) {
            throw new InvalidFormatVO('Invalid email format')
        }


    }

    static build(date: string): DateVO {

        return new DateVO(date)
    }
}