import * as functions from 'firebase-functions'
import container from '../dependency-injection/container'
import { ContainerSymbols } from '../dependency-injection/symbols'
import { LoadStudentsUseCase } from '../teachers/application/use-cases/students/LoadStudents.usecase'
import { LoadStudentsPub } from '../teachers/domain/publisher/LoadStudents'


export const LoadStudentsPubsub = functions
    .runWith({ memory: '256MB', timeoutSeconds: 300 })
    .pubsub.topic('load_students')
    .onPublish(async (message: functions.pubsub.Message) => {

        const msg: LoadStudentsPub = message.json

        const loadStudentsUseCase = container.get<LoadStudentsUseCase>(
            ContainerSymbols.LoadStudentsUseCase
        )

        await loadStudentsUseCase.run(msg.teacher, msg.sheetId)
    })