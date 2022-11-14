import { Router } from 'express'
import container from '../../dependency-injection/container'
import { ContainerSymbols } from '../../dependency-injection/symbols'
import { AssignCommissionSheetController } from '../controllers/teacher/AssignCommissionSheet.ctrl'
import { DeleteTeacherAccountController } from '../controllers/teacher/DeleteTeacherAccount.ctrl'
import { verifyApiKey } from '../middleware/verifyApiKey'

const deleteTeacherAccountController = container.get<DeleteTeacherAccountController>(
    ContainerSymbols.DeleteTeacherAccountController
)

const assignCommissionSheetController = container.get<AssignCommissionSheetController>(
    ContainerSymbols.AssignCommissionSheetController
)

const route = Router()
route.use(verifyApiKey)

route.post('/delete', deleteTeacherAccountController.run.bind(deleteTeacherAccountController))

route.post('/duplicate-sheet', assignCommissionSheetController.run.bind(assignCommissionSheetController))

export default route
