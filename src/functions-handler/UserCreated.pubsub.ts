import * as functions from 'firebase-functions'
import container from '../dependency-injection/container'
import { ContainerSymbols } from '../dependency-injection/symbols'
import logger from '../shared/infraestructure/logger/Winston'
import { CreateAssistantUseCase } from '../teachers/application/use-cases/assistant/CreateAssistant.usecase'
import { CreateTeacherUseCase } from '../teachers/application/use-cases/teacher/CreateTeacher.usecase'
import { UserCreated } from '../teachers/domain/publisher/UserCreated'

export const UserCreatedPubSub = functions
    .runWith({ memory: '256MB', timeoutSeconds: 300 })
    .pubsub.topic('user_created')
    .onPublish(async (message: functions.pubsub.Message) => {

        const user: UserCreated = message.json

        const createTeacherUseCase = container.get<CreateTeacherUseCase>(
            ContainerSymbols.CreateTeacherUseCase
        )

        const createAssistantUseCase = container.get<CreateAssistantUseCase>(
            ContainerSymbols.CreateAssistantUseCase
        )

        try {
            if (user.isTeacher) {

                await createTeacherUseCase.run(user.email)

            } else {

                await createAssistantUseCase.run(user.email)
            }

        } catch (err) {
            logger.error(err)
        }

    })

