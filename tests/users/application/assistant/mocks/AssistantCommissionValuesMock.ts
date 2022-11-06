import { cutEmail } from '../../../../../src/shared/domain/cutEmail'
import { AssistantCommission } from '../../../../../src/users/domain/entities/AssistantCommission'
import { CommissionVO } from '../../../../../src/users/domain/value-objects/Commission.vo'
import { EmailVO } from '../../../../../src/users/domain/value-objects/Email.vo'
import { MainTeacherVO } from '../../../../../src/users/domain/value-objects/MainTeacher.vo'
import { SubjectVO } from '../../../../../src/users/domain/value-objects/Subject.vo'

const teacherEmail = 'teacheremail@gmail.com'
const commission = '1-2022'
const subject = 'programming'

const teacherEmailCuted = cutEmail(EmailVO.build(teacherEmail).value)

const mainTeacher = MainTeacherVO.build(teacherEmailCuted)
const assitantCommission = CommissionVO.build(commission)
const assistantSubject = SubjectVO.build(subject)

export const commissionSubscription = AssistantCommission.create(
    mainTeacher,
    assitantCommission,
    assistantSubject
)