import { isNullable } from '../isNullable'
import { InvalidFormatVO } from './InvalidFormatVO'
import { ValueObject } from './ValueObject'
import { EMAIL_REGEX } from '../../../teachers/domain/constants'

export class EmailVO extends ValueObject<string>{

    constructor(email: string) {
        super(email)
        this.assertIsValid(email)
    }

    protected assertIsValid(email: string) {
        if (isNullable(email)) {
            throw new InvalidFormatVO('Email value must be defined')
        }

        if (!EMAIL_REGEX.test(email)) {
            throw new InvalidFormatVO('Invalid email format')
        }

    }

    static build(email: string): EmailVO {
        return new EmailVO(EmailVO.format(email))
    }

    private static format(email: string): string {
        return email.trim().toLowerCase()
    }
}