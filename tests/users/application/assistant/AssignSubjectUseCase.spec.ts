import 'reflect-metadata'
import { AssignSubjectUseCase } from '../../../../src/users/application/use-cases/assistant/AssignSubject.usecase'
import { Assistant } from '../../../../src/users/domain/entities/Assistant'
import { FirebaseAssistantRepositoryMock } from '../../__mocks__/FirebaseAssistantRepositoryMock'
import { commissionSubscription } from './mocks/AssistantCommissionValuesMock'
import { AssistantNotFound } from '../../../../src/users/application/errors/AssistantNotFound'



describe('AssignSubjectUseCase', () => {
    let assistantRepository: FirebaseAssistantRepositoryMock
    let assignSubject: AssignSubjectUseCase

    beforeAll(() => {
        jest.clearAllMocks()
        assistantRepository = new FirebaseAssistantRepositoryMock()
        assignSubject = new AssignSubjectUseCase(assistantRepository)

    })

    it('should assign a subject to the assistant', async () => {

        const excelentName = 'excelentName'

        const assistant = Assistant.create({
            name: excelentName,
            commissionSubscription
        })

        await assistantRepository.createAssistant(assistant)

        await assignSubject.run(assistant)


        assistantRepository.assertAssignHasBeenCalledWithAssistant(assistant)
        assistantRepository.assertStatusHasBeenCalled()

    })

    it('should return an exception (AssistantNotFound) when trying to assign subjects to one assistant that doesnt exists', async () => {
        expect.assertions(1)

        const nameThatDoesntExist = 'nameThatDoesntExist'

        const assistant = Assistant.create({
            name: nameThatDoesntExist,
            commissionSubscription
        })

        try {
            await assignSubject.run(assistant)
            fail('expect an exception')

        } catch (err: unknown) {

            expect(err)
                .toBeInstanceOf(AssistantNotFound)
        }
    })

    afterAll(() => {
        jest.clearAllMocks()
    })
})