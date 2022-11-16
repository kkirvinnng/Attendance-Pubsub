import { Router } from 'express'
import container from '../../dependency-injection/container'
import { ContainerSymbols } from '../../dependency-injection/symbols'
import { UserRegisterController } from '../controllers/teachers/users-auth/UserRegister.ctrl'
import { verifyApiKey } from '../middleware/verifyApiKey'

const userRegisterController = container.get<UserRegisterController>(
    ContainerSymbols.UserRegisterController
)

const route = Router()
route.use(verifyApiKey)

route.post('/register', userRegisterController.run.bind(userRegisterController))

export default route