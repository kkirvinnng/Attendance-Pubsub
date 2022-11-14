import { injectable, inject } from 'inversify'
import { ContainerSymbols } from '../../../../dependency-injection/symbols'
import { cutEmail } from '../../../../shared/domain/cutEmail'
import { Assistant } from '../../../domain/entities/Assistant'
import { AssistantRepository } from '../../../domain/repositories/AssistantRepository'
import { AssistantAlreadyExists } from '../../errors/AssistantAlreadyExists'


/**
   @inject 
   @interface AssistantRepository
*/
@injectable()
export class CreateAssistantUseCase {

    constructor(
        @inject(ContainerSymbols.FirebaseAssistantRepository)
        private readonly assitantRepository: AssistantRepository

    ) { }

    async run(email: string) {

        const emailCuted = cutEmail(email)

        const assistant = Assistant.create({
            name: emailCuted
        })

        const checkNull = await this.assitantRepository.createAssistant(assistant)

        if (checkNull === null) {
            throw new AssistantAlreadyExists(`The assistant ${email} already exists in the database`)
        }

        await this.assitantRepository.changeAssistantStatus(assistant.name, '1')
    }
}