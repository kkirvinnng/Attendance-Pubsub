import { isNullable } from '../../../shared/domain/isNullable'
import { InvalidFormatVO } from '../../../shared/domain/value-objects/InvalidFormatVO'
import { ValueObject } from '../../../shared/domain/value-objects/ValueObject'

export class PasswordVO extends ValueObject<string> {
    constructor(password: string) {
        super(password)
        this.assertIsValid(password)
    }

    protected assertIsValid(password: string) {
        if (password.length < 6) {
            throw new InvalidFormatVO('Invalid password format')
        }
    }

    static build(plainPassword: string) {
        if (isNullable(plainPassword) || plainPassword.length < 6) {
            throw new InvalidFormatVO('Invalid password format')
        }

        return new PasswordVO(plainPassword)
    }


}