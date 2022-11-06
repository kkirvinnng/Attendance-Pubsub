import { Router } from 'express'
import container from '../../dependency-injection/container'
import { ContainerSymbols } from '../../dependency-injection/symbols'
import { DeleteTeacherAccountController } from '../controllers/teacher/DeleteTeacherAccount.ctrl'
import { verifyApiKey } from '../middleware/verifyApiKey'

const deleteTeacherAccountController = container.get<DeleteTeacherAccountController>(
    ContainerSymbols.DeleteTeacherAccountController
)

const route = Router()
route.use(verifyApiKey)

route.post('/delete', deleteTeacherAccountController.run.bind(deleteTeacherAccountController))


export default route
