import { Container } from 'inversify'
import { Publisher } from '../shared/domain/pubsub/Publisher'
import { GCPPubSub } from '../shared/infraestructure/gcp-pubsub/PubSub'
import { DeleteUserAccountUseCase } from '../teachers/application/use-cases/users-auth/DeleteUserAccount.usecase'
import { UserRegisterUseCase } from '../teachers/application/use-cases/users-auth/UserRegister.usecase'
import { UserAuthRepository } from '../teachers/domain/repositories/UserAuthRepository'
import { DeleteTeacherAccountController } from '../api/controllers/teachers/teacher/DeleteTeacherAccount.ctrl'
import { UserRegisterController } from '../api/controllers/teachers/users-auth/UserRegister.ctrl'
import { FirebaseAuthRepository } from '../teachers/infraestructure/persistence/FirebaseAuthRepository'
import { ContainerSymbols } from './symbols'
import { TeacherRepository } from '../teachers/domain/repositories/TeacherRepository'
import { FirebaseTeacherRepository } from '../teachers/infraestructure/persistence/FirebaseTeacherRepository'
import { CreateTeacherUseCase } from '../teachers/application/use-cases/teachers/CreateTeacher.usecase'
import { GoogleDriveService } from '../teachers/infraestructure/google-drive/GoogleDriveService'
import { DriveService } from '../teachers/domain/services/drive/DriveService'
import { DeleteTeacherUseCase } from '../teachers/application/use-cases/teachers/DeleteTeacher.usecase'
import { AssistantRepository } from '../teachers/domain/repositories/AssistantRepository'
import { FirebaseAssistantRepository } from '../teachers/infraestructure/persistence/FirebaseAssistantRepository'
import { CreateAssistantUseCase } from '../teachers/application/use-cases/assistants/CreateAssistant.usecase'
import { DeleteAssistantUseCase } from '../teachers/application/use-cases/assistants/DeleteAssistant.usecase'
import { DeleteAssistantAccountController } from '../api/controllers/teachers/assistant/DeleteAssistantAccount.ctrl'
import { AssignSubjectUseCase } from '../teachers/application/use-cases/assistants/AssignSubject.usecase'
import { AssignSubjectController } from '../api/controllers/teachers/assistant/AssignSubject.ctrl'
import { TeacherSpreadsheetService } from '../teachers/infraestructure/google-spreadsheet/TeacherSpreadsheetService'
import { TeacherSheet } from '../teachers/domain/services/spreadsheet/TeacherSheet'
import { AssignCommissionSheetUseCase } from '../teachers/application/use-cases/teachers/AssignCommissionSheet.usecase'
import { AssignCommissionSheetController } from '../api/controllers/teachers/teacher/AssignCommissionSheet.ctrl'
import { LoadStudentsUseCase } from '../teachers/application/use-cases/students/LoadStudents.usecase'
import { LoadStudentsController } from '../api/controllers/students/LoadStudents.ctrl.usecase'
import { StudentsSpreadsheetService } from '../teachers/infraestructure/google-spreadsheet/StudentsSpreadsheetService'
import { StudentsRepository } from '../teachers/domain/repositories/StudentsRepository'
import { FirebaseStudentsRepository } from '../teachers/infraestructure/persistence/FirebaseStudentsRepository'
import { StudentSheet } from '../teachers/domain/services/spreadsheet/StudentSheet'
import { StudentsAttendanceController } from '../api/controllers/students/StudentsAttendance.ctrl'
import { StudentsAttendanceUseCase } from '../teachers/application/use-cases/students/StudentsAttendance.usecase'

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
    container
        .bind<StudentsRepository>(ContainerSymbols.FirebaseStudentsRepository)
        .to(FirebaseStudentsRepository)
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
    container.
        bind<AssignCommissionSheetUseCase>(ContainerSymbols.AssignCommissionSheetUseCase)
        .to(AssignCommissionSheetUseCase)
}

const TeacherControllers = () => {
    container
        .bind<DeleteTeacherAccountController>(ContainerSymbols.DeleteTeacherAccountController)
        .to(DeleteTeacherAccountController)
    container
        .bind<AssignCommissionSheetController>(ContainerSymbols.AssignCommissionSheetController)
        .to(AssignCommissionSheetController)
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

const StudentsUseCases = () => {
    container
        .bind<LoadStudentsUseCase>(ContainerSymbols.LoadStudentsUseCase)
        .to(LoadStudentsUseCase)
    container
        .bind<StudentsAttendanceUseCase>(ContainerSymbols.StudentsAttendanceUseCase)
        .to(StudentsAttendanceUseCase)
}

const StudentsControllers = () => {
    container
        .bind<LoadStudentsController>(ContainerSymbols.LoadStudentsController)
        .to(LoadStudentsController)
    container
        .bind<StudentsAttendanceController>(ContainerSymbols.StudentsAttendanceController)
        .to(StudentsAttendanceController)
}


const ExternalServices = () => {
    container
        .bind<Publisher>(ContainerSymbols.GCPPubSub)
        .to(GCPPubSub)

    container
        .bind<DriveService>(ContainerSymbols.GoogleDriveService)
        .to(GoogleDriveService)

    container
        .bind<TeacherSheet>(ContainerSymbols.TeacherSpreadsheetService)
        .to(TeacherSpreadsheetService)
    container
        .bind<StudentSheet>(ContainerSymbols.StudentsSpreadsheetService)
        .to(StudentsSpreadsheetService)
}

Repositories()

UserAuthUseCases()
UserAuthControllers()

TeacherUseCases()
TeacherControllers()

AssistantUseCases()
AssistantControllers()

StudentsUseCases()
StudentsControllers()

ExternalServices()

export default container
