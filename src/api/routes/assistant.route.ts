import { Router } from 'express'
import container from '../../dependency-injection/container'
import { ContainerSymbols } from '../../dependency-injection/symbols'
import { AssignSubjectController } from '../controllers/assistant/AssignSubject.ctrl'
import { DeleteAssistantAccountController } from '../controllers/assistant/DeleteAssistantAccount.ctrl'
import { verifyApiKey } from '../middleware/verifyApiKey'

const deleteAssistantAccountController = container.get<DeleteAssistantAccountController>(
    ContainerSymbols.DeleteAssistantAccountController
)

const assignSubjectController = container.get<AssignSubjectController>(
    ContainerSymbols.AssignSubjectController
)

const route = Router()
route.use(verifyApiKey)

route.post('/delete', deleteAssistantAccountController.run.bind(deleteAssistantAccountController))
route.put('/assign/subject', assignSubjectController.run.bind(assignSubjectController))


export default route
