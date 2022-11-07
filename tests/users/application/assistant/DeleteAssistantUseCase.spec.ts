import 'reflect-metadata'
import { AssistantNotFound } from '../../../../src/users/application/errors/AssistantNotFound'
import { DeleteAssistantUseCase } from '../../../../src/users/application/use-cases/assistant/DeleteAssistant.usecase'
import { Assistant } from '../../../../src/users/domain/entities/Assistant'
import { FirebaseAssistantRepositoryMock } from '../../__mocks__/FirebaseAssistantRepositoryMock'

describe('DeleteAssistantUseCase', () => {
    let assistantRepository: FirebaseAssistantRepositoryMock
    let deleteAssistant: DeleteAssistantUseCase

    beforeAll(() => {

        assistantRepository = new FirebaseAssistantRepositoryMock()
        deleteAssistant = new DeleteAssistantUseCase(assistantRepository)

    })

    it('should remove an assistant', async () => {
        const name = 'mypersonalname'

        const assistant = Assistant.create({
            name
        })

        await assistantRepository.createAssistant(assistant)

        await deleteAssistant.run(name)

        assistantRepository.assertRemoveHasBeenCalled()
    })

    it('should return an exception (AssistantNotFound) when trying to remove a assistant that doesnt exists', async () => {
        expect.assertions(1)

        const name = 'mypersonalname'

        try {
            await deleteAssistant.run(name)
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