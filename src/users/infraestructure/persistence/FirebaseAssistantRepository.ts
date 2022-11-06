import { injectable } from 'inversify'
import { FirebaseDataSource } from '../../../shared/infraestructure/persistence/FirebaseDataSource'
import { TeacherStatus } from '../../domain/types/TeacherStatus'
import { Assistant } from '../../domain/entities/Assistant'
import { AssistantRepository } from '../../domain/repositories/AssistantRepository'
import { KeyAsString } from '../../../shared/types/KeyAsString'

@injectable()
export class FirebaseAssistantRepository extends FirebaseDataSource
    implements AssistantRepository {


    private toPersistance({ isTeacher }: Assistant) {

        return {
            // always is false
            esProfesor: isTeacher
        }
    }

    async createAssistant({ name, isTeacher }: Assistant): Promise<void | null> {
        const persistAssistant = this.toPersistance({ isTeacher })
        const path = `/${name}/datos`

        const dbExists = await super.exists(path)

        if (dbExists) {
            return null
        }

        await super.update(path, persistAssistant)
    }

    async deleteAssistant(name: string): Promise<void | null> {
        const path = `/${name}/datos`
        const dbExists = await super.exists(path)

        if (!dbExists) {
            return null
        }

        await super.remove(name)
    }

    async changeAssistantStatus(name: string, status: TeacherStatus): Promise<void> {

        const path = `/${name}/datos`

        await super.update(path, { estado: parseInt(status) })
    }

    async assignSubject(assistant: Required<Assistant>): Promise<void | null> {

        const dbExists = await super.exists(assistant.name)

        if (!dbExists) {
            return null
        }

        let path = `/${assistant.name}/datos/profesorTitular`

        const mainTeacher = assistant.commissionSubscription.mainTeacher.value
        const commission = assistant.commissionSubscription.commission.value
        const subject = assistant.commissionSubscription.subject.value


        path = path.concat(
            '/', mainTeacher!,
            '/', commission!
        )

        const persistence: KeyAsString = {
            subject: subject
        }

        await super.update(path, persistence)
    }
}