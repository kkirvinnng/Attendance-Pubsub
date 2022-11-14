import * as functions from 'firebase-functions'
import container from '../dependency-injection/container'
import { ContainerSymbols } from '../dependency-injection/symbols'
import { DeleteTeacherUseCase } from '../teachers/application/use-cases/teacher/DeleteTeacher.usecase'
import { TeacherDeleted } from '../teachers/domain/publisher/TeacherDeleted'

export const TeacherDeletedPubSub = functions
    .runWith({ memory: '256MB', timeoutSeconds: 300 })
    .pubsub.topic('teacher_deleted')
    .onPublish(async (message: functions.pubsub.Message) => {

        const teacher: TeacherDeleted = message.json

        const deleteTeacherUseCase = container.get<DeleteTeacherUseCase>(
            ContainerSymbols.DeleteTeacherUseCase
        )

        await deleteTeacherUseCase.run(teacher.email)
    })