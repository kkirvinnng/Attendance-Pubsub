import 'reflect-metadata'
import { TeacherAlreadyExists } from '../../../../src/users/application/errors/TeacherAlreadyExists'
import { CreateTeacherUseCase } from '../../../../src/users/application/use-cases/teacher/CreateTeacher.usecase'
import { Teacher } from '../../../../src/users/domain/entities/Teacher'
import { EmailVO } from '../../../../src/users/domain/value-objects/Email.vo'
import { DriveServiceMock } from '../../__mocks__/DriveServiceMock'
import { FirebaseTeacherRepositoryMock } from '../../__mocks__/FirebaseTeacherRepositoryMock'

describe('CreateTeacherUseCase', () => {
    let teacherRepository: FirebaseTeacherRepositoryMock
    let driveService: DriveServiceMock
    let createTeacher: CreateTeacherUseCase

    beforeAll(() => {

        teacherRepository = new FirebaseTeacherRepositoryMock()
        driveService = new DriveServiceMock()
        createTeacher = new CreateTeacherUseCase(teacherRepository, driveService)

    })

    it('creates a teacher spreadsheet', async () => {
        const email = 'mypersonalemail@gmail.com'

        await createTeacher.run(email)

        driveService.assertSaveHasBeenCalled()
        teacherRepository.assertSaveHasBeenCalled()
        teacherRepository.assertStatusHasBeenCalled()

    })

    it('should return an exception (TeacherAlreadyExists) when trying to create a teacher that already exists', async () => {
        expect.assertions(1)

        const email = 'mypersonalemail@gmail.com'

        const teacher = Teacher.create({
            name: 'mypersonalemail',
            email: EmailVO.build(email),
            idSheet: '1'
        })

        await teacherRepository.createTeacher(teacher)

        try {
            await createTeacher.run(email)
            fail('expect an exception')

        } catch (err: unknown) {

            expect(err)
                .toBeInstanceOf(TeacherAlreadyExists)
        }
    })

    afterAll(() => {
        jest.clearAllMocks()
    })
})