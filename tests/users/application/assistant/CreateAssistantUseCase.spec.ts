import 'reflect-metadata'
import { AssistantAlreadyExists } from '../../../../src/users/application/errors/AssistantAlreadyExists'
import { CreateAssistantUseCase } from '../../../../src/users/application/use-cases/assistant/CreateAssistant.usecase'
import { Assistant } from '../../../../src/users/domain/entities/Assistant'
import { FirebaseAssistantRepositoryMock } from '../../__mocks__/FirebaseAssistantRepositoryMock'

describe('CreateAssistantUseCase', () => {
    let assistantRepository: FirebaseAssistantRepositoryMock
    let createAssistant: CreateAssistantUseCase

    beforeAll(() => {

        assistantRepository = new FirebaseAssistantRepositoryMock()
        createAssistant = new CreateAssistantUseCase(assistantRepository)
    })

    it('creates an assistant', async () => {
        const email = 'mypersonalemail@gmail.com'

        await createAssistant.run(email)


        assistantRepository.assertSaveHasBeenCalled()
        assistantRepository.assertStatusHasBeenCalled()

    })

    it('should return an exception (AssistantAlreadyExists) when trying to create an assistant that already exists', async () => {
        expect.assertions(1)

        const email = 'mypersonalname@gmail.com'

        const assistant = Assistant.create({
            name: 'mypersonalname',
        })

        await assistantRepository.createAssistant(assistant)

        try {
            await createAssistant.run(email)
            fail('expect an exception')

        } catch (err: unknown) {

            expect(err)
                .toBeInstanceOf(AssistantAlreadyExists)
        }
    })

    afterAll(() => {
        jest.clearAllMocks()
    })
})