import { injectable, inject } from 'inversify'
import { ContainerSymbols } from '../../../../dependency-injection/symbols'
import { Assistant } from '../../../domain/entities/Assistant'
import { AssistantRepository } from '../../../domain/repositories/AssistantRepository'
import { AssistantNotFound } from '../../errors/AssistantNotFound'


/**
   @inject 
   @interface AssistantRepository
*/
@injectable()
export class AssignSubjectUseCase {

    constructor(
        @inject(ContainerSymbols.FirebaseAssistantRepository)
        private readonly assistantRepository: AssistantRepository
    ) { }

    async run(assistant: Assistant) {

        const checkNull = await this.assistantRepository.assignSubject(assistant)

        if (checkNull === null) {
            throw new AssistantNotFound(`The assistant ${assistant.name} doesn't exists in the database`)
        }

        await this.assistantRepository.changeAssistantStatus(assistant.name, '3')
    }
}