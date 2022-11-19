/* eslint-disable @typescript-eslint/no-unused-vars */
import { injectable } from 'inversify'
import { Teacher } from '../../domain/entities/Teacher'
import { TeacherRepository } from '../../domain/repositories/TeacherRepository'
import { FirebaseDataSource } from '../../../shared/infraestructure/persistence/FirebaseDataSource'
import { AppStatus } from '../../../shared/types/AppStatus'

@injectable()
export class FirebaseTeacherRepository extends FirebaseDataSource
    implements TeacherRepository {

    private toPersistance({ idSheet }: Teacher) {

        return {
            esProfesor: true,
            idPlanilla: idSheet
        }
    }

    async createTeacher(teacher: Teacher): Promise<void | null> {
        const persistTeacher = this.toPersistance(teacher)

        const path = `/${teacher.name}/datos`

        const dbExists = await super.exists(path)

        if (dbExists) {
            return null
        }

        await super.update(path, persistTeacher)
    }

    async deleteTeacher(name: string): Promise<void | null> {
        const path = `/${name}/datos`
        const dbExists = await super.exists(path)

        if (!dbExists) {
            return null
        }

        await super.remove(name)
    }

    async changeTeacherStatus(name: string, status: AppStatus): Promise<void> {

        const path = `/${name}/datos/estado`

        await super.update(path, parseInt(status))
    }

    async getTeacherStatus(name: string): Promise<string> {
        const path = `/${name}/datos/estado`

        const status: number = await super.get(path)

        return status.toString()
    }

    async exists(name: string): Promise<boolean> {
        const path = `/${name}`
        return super.exists(path)
    }
}