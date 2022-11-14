import { Container } from 'inversify'
import { Publisher } from '../shared/domain/pubsub/Publisher'
import { GCPPubSub } from '../shared/infraestructure/gcp-pubsub/PubSub'
import { DeleteUserAccountUseCase } from '../teachers/application/use-cases/users-auth/DeleteUserAccount.usecase'
import { UserRegisterUseCase } from '../teachers/application/use-cases/users-auth/UserRegister.usecase'
import { UserAuthRepository } from '../teachers/domain/repositories/UserAuthRepository'
import { DeleteTeacherAccountController } from '../api/controllers/teacher/DeleteTeacherAccount.ctrl'
import { UserRegisterController } from '../api/controllers/users-auth/UserRegister.ctrl'
import { FirebaseAuthRepository } from '../teachers/infraestructure/persistence/FirebaseAuthRepository'
import { ContainerSymbols } from './symbols'
import { TeacherRepository } from '../teachers/domain/repositories/TeacherRepository'
import { FirebaseTeacherRepository } from '../teachers/infraestructure/persistence/FirebaseTeacherRepository'
import { CreateTeacherUseCase } from '../teachers/application/use-cases/teacher/CreateTeacher.usecase'
import { GoogleDriveService } from '../teachers/infraestructure/google-drive/GoogleDriveService'
import { DriveService } from '../teachers/domain/services/drive/DriveService'
import { DeleteTeacherUseCase } from '../teachers/application/use-cases/teacher/DeleteTeacher.usecase'
import { AssistantRepository } from '../teachers/domain/repositories/AssistantRepository'
import { FirebaseAssistantRepository } from '../teachers/infraestructure/persistence/FirebaseAssistantRepository'
import { CreateAssistantUseCase } from '../teachers/application/use-cases/assistant/CreateAssistant.usecase'
import { DeleteAssistantUseCase } from '../teachers/application/use-cases/assistant/DeleteAssistant.usecase'
import { DeleteAssistantAccountController } from '../api/controllers/assistant/DeleteAssistantAccount.ctrl'
import { AssignSubjectUseCase } from '../teachers/application/use-cases/assistant/AssignSubject.usecase'
import { AssignSubjectController } from '../api/controllers/assistant/AssignSubject.ctrl'

const container = new Container()

const Repositories = () => {
    container
        .bind<UserAuthRepository>(ContainerSymbols.FirebaseAuthRepository)
        .to(FirebaseAuthRepository)
    container
        .bind<TeacherRepository>(ContainerSymbols.FirebaseTeacherRepository)
        .to(FirebaseTeacherRepository)
    container
        .bind<AssistantRepository>(ContainerSymbols.FirebaseAssistantRepository)
        .to(FirebaseAssistantRepository)
}

const UserAuthUseCases = () => {
    container
        .bind<UserRegisterUseCase>(ContainerSymbols.UserRegisterUseCase)
        .to(UserRegisterUseCase)

    container
        .bind<DeleteUserAccountUseCase>(ContainerSymbols.DeleteUserAccountUseCase)
        .to(DeleteUserAccountUseCase)
}

const UserAuthControllers = () => {
    container
        .bind<UserRegisterController>(ContainerSymbols.UserRegisterController)
        .to(UserRegisterController)
}

const TeacherUseCases = () => {
    container
        .bind<CreateTeacherUseCase>(ContainerSymbols.CreateTeacherUseCase)
        .to(CreateTeacherUseCase)

    container.
        bind<DeleteTeacherUseCase>(ContainerSymbols.DeleteTeacherUseCase)
        .to(DeleteTeacherUseCase)
}

const AssistantUseCases = () => {
    container
        .bind<CreateAssistantUseCase>(ContainerSymbols.CreateAssistantUseCase)
        .to(CreateAssistantUseCase)
    container
        .bind<DeleteAssistantUseCase>(ContainerSymbols.DeleteAssistantUseCase)
        .to(DeleteAssistantUseCase)
    container
        .bind<AssignSubjectUseCase>(ContainerSymbols.AssignSubjectUseCase)
        .to(AssignSubjectUseCase)
}

const AssistantControllers = () => {
    container
        .bind<DeleteAssistantAccountController>(ContainerSymbols.DeleteAssistantAccountController)
        .to(DeleteAssistantAccountController)
    container
        .bind<AssignSubjectController>(ContainerSymbols.AssignSubjectController)
        .to(AssignSubjectController)
}

const TeacherControllers = () => {
    container
        .bind<DeleteTeacherAccountController>(ContainerSymbols.DeleteTeacherAccountController)
        .to(DeleteTeacherAccountController)
}



const ExternalServices = () => {
    container
        .bind<Publisher>(ContainerSymbols.GCPPubSub)
        .to(GCPPubSub)

    container
        .bind<DriveService>(ContainerSymbols.GoogleDriveService)
        .to(GoogleDriveService)
}

Repositories()

UserAuthUseCases()
TeacherUseCases()
AssistantUseCases()

UserAuthControllers()
AssistantControllers()
TeacherControllers()

ExternalServices()

export default container
