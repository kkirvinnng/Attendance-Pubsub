import 'reflect-metadata'
import { TeacherNotFound } from '../../../../src/users/application/errors/TeacherNotFound'
import { DeleteTeacherUseCase } from '../../../../src/users/application/use-cases/teacher/DeleteTeacher.usecase'
import { Teacher } from '../../../../src/users/domain/entities/Teacher'
import { EmailVO } from '../../../../src/users/domain/value-objects/Email.vo'
import { DriveServiceMock } from '../../__mocks__/DriveServiceMock'
import { FirebaseTeacherRepositoryMock } from '../../__mocks__/FirebaseTeacherRepositoryMock'

describe('DeleteTeacherUseCase', () => {
    let teacherRepository: FirebaseTeacherRepositoryMock
    let driveService: DriveServiceMock
    let deleteTeacher: DeleteTeacherUseCase

    beforeAll(() => {

        teacherRepository = new FirebaseTeacherRepositoryMock()
        driveService = new DriveServiceMock()
        deleteTeacher = new DeleteTeacherUseCase(teacherRepository, driveService)

    })

    it('should remove a teacher', async () => {
        const name = 'mypersonalname'

        const email = 'mypersonalemail@gmail.com'

        const teacher = Teacher.create({
            name,
            email: EmailVO.build(email),
            idSheet: '1'
        })

        await teacherRepository.createTeacher(teacher)

        await deleteTeacher.run(name)

        teacherRepository.assertRemoveHasBeenCalled()
        driveService.assertRemoveHasBeenCalled()
    })

    it('should return an exception (TeacherNotFound) when trying to remove a teacher that doesnt exists', async () => {
        expect.assertions(1)

        const name = 'mypersonalname'

        try {
            await deleteTeacher.run(name)
            fail('expect an exception')

        } catch (err: unknown) {

            expect(err)
                .toBeInstanceOf(TeacherNotFound)
        }
    })

    afterAll(() => {
        jest.clearAllMocks()
    })
})