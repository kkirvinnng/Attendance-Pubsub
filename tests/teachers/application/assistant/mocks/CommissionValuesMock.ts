import { cutEmail } from '../../../../../src/shared/domain/cutEmail'
import { EmailVO } from '../../../../../src/shared/domain/value-objects/Email.vo'
import { Commission } from '../../../../../src/teachers/domain/entities/Commission'
import { CommissionVO } from '../../../../../src/teachers/domain/value-objects/Commission.vo'
import { MainTeacherVO } from '../../../../../src/teachers/domain/value-objects/MainTeacher.vo'
import { SubjectVO } from '../../../../../src/teachers/domain/value-objects/Subject.vo'

const teacherEmail = 'teacheremail@gmail.com'
const commission = '1-2022'
const subject = 'programming'

const teacherEmailCuted = cutEmail(EmailVO.build(teacherEmail).value)

const mainTeacher = MainTeacherVO.build(teacherEmailCuted)
const assitantCommission = CommissionVO.build(commission)
const assistantSubject = SubjectVO.build(subject)

export const commissionSubscription = Commission.create(
    mainTeacher,
    assitantCommission,
    assistantSubject
)