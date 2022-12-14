const Repositories = {
    FirebaseAuthRepository: Symbol.for('FirebaseAuthRepository'),
    FirebaseTeacherRepository: Symbol.for('FirebaseTeacherRepository'),
    FirebaseStudentsRepository: Symbol.for('FirebaseStudentsRepository'),
    FirebaseAssistantRepository: Symbol.for('FirebaseAssistantRepository'),
}

const UserAuthUseCases = {
    UserRegisterUseCase: Symbol.for('UserRegisterUseCase'),
    DeleteUserAccountUseCase: Symbol.for('DeleteUserAccountUseCase'),
}

const UserAuthControllers = {
    UserRegisterController: Symbol.for('UserRegisterController'),
}

const TeacherUseCases = {
    CreateTeacherUseCase: Symbol.for('CreateTeacherUseCase'),
    DeleteTeacherUseCase: Symbol.for('DeleteTeacherUseCase'),
    AssignCommissionSheetUseCase: Symbol.for('AssignCommissionSheetUseCase')
}

const TeacherControllers = {
    DeleteTeacherAccountController: Symbol.for('DeleteTeacherAccountController'),
    AssignCommissionSheetController: Symbol.for('AssignCommissionSheetController'),
}

const AssistantUseCases = {
    CreateAssistantUseCase: Symbol.for('CreateAssistantUseCase'),
    DeleteAssistantUseCase: Symbol.for('DeleteAssistantUseCase'),
    AssignSubjectUseCase: Symbol.for('AssignSubjectUseCase'),

}

const AssistantControllers = {
    DeleteAssistantAccountController: Symbol.for('DeleteAssistantAccountController'),
    AssignSubjectController: Symbol.for('AssignSubjectController'),
}

const StudentsUseCases = {
    LoadStudentsUseCase: Symbol.for('LoadStudentsUseCase'),
    StudentsAttendanceUseCase: Symbol.for('StudentsAttendanceUseCase'),
}

const StudentsControllers = {
    LoadStudentsController: Symbol.for('LoadStudentsController'),
    StudentsAttendanceController: Symbol.for('StudentsAttendanceController'),
}

const ExternalServices = {
    GCPPubSub: Symbol.for('GCPPubSub'),
    GoogleDriveService: Symbol.for('GoogleDriveService'),
    TeacherSpreadsheetService: Symbol.for('TeacherSpreadsheetService'),
    StudentsSpreadsheetService: Symbol.for('StudentsSpreadsheetService'),


}

const ContainerSymbols = {
    ...ExternalServices,

    ...Repositories,

    ...UserAuthUseCases,
    ...TeacherUseCases,
    ...AssistantUseCases,
    ...StudentsUseCases,


    ...UserAuthControllers,
    ...TeacherControllers,
    ...AssistantControllers,
    ...StudentsControllers,
}

export { ContainerSymbols }