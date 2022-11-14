import { injectable, inject } from 'inversify'
import { ContainerSymbols } from '../../../../dependency-injection/symbols'
import { cutEmail } from '../../../../shared/domain/cutEmail'
import { AssistantRepository } from '../../../domain/repositories/AssistantRepository'
import { AssistantNotFound } from '../../errors/AssistantNotFound'


/**
   @inject 
   @interface AssistantRepository
*/
@injectable()
export class DeleteAssistantUseCase {

    constructor(
        @inject(ContainerSymbols.FirebaseAssistantRepository)
        private readonly assitantRepository: AssistantRepository

    ) { }

    async run(email: string) {


        //todo: cut the email
        const emailCuted = cutEmail(email)
        const checkNull = await this.assitantRepository.deleteAssistant(emailCuted)

        if (checkNull === null) {
            throw new AssistantNotFound('The assistant doesnt exist')
        }
    }
}