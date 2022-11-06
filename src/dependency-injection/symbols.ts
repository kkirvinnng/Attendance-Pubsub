const Repositories = {
    FirebaseAuthRepository: Symbol.for('FirebaseAuthRepository'),
    FirebaseTeacherRepository: Symbol.for('FirebaseTeacherRepository'),
    FirebaseAssistantRepository: Symbol.for('FirebaseAssistantRepository'),
}

const UserAuthUseCases = {
    UserRegisterUseCase: Symbol.for('UserRegisterUseCase'),
    DeleteUserAccountUseCase: Symbol.for('DeleteUserAccountUseCase'),
}

const TeacherUseCases = {
    CreateTeacherUseCase: Symbol.for('CreateTeacherUseCase'),
    DeleteTeacherUseCase: Symbol.for('DeleteTeacherUseCase')
}


const AssistantUseCases = {
    CreateAssistantUseCase: Symbol.for('CreateAssistantUseCase'),
    DeleteAssistantUseCase: Symbol.for('DeleteAssistantUseCase'),
    AssignSubjectUseCase: Symbol.for('AssignSubjectUseCase'),

}


const TeacherControllers = {
    DeleteTeacherAccountController: Symbol.for('DeleteTeacherAccountController'),
}

const AssistantControllers = {
    DeleteAssistantAccountController: Symbol.for('DeleteAssistantAccountController'),
    AssignSubjectController: Symbol.for('AssignSubjectController'),
}


const UserAuthControllers = {
    UserRegisterController: Symbol.for('UserRegisterController'),
}

const ExternalServices = {
    GCPPubSub: Symbol.for('GCPPubSub'),
    GoogleDriveService: Symbol.for('GoogleDriveService'),

}

const ContainerSymbols = {
    ...ExternalServices,

    ...Repositories,

    ...UserAuthUseCases,
    ...TeacherUseCases,
    ...AssistantUseCases,

    ...UserAuthControllers,
    ...TeacherControllers,
    ...AssistantControllers
}

export { ContainerSymbols }