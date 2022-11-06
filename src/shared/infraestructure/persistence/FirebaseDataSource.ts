import { Database } from 'firebase-admin/database'
import { injectable } from 'inversify'
import firebase from '../../../shared/infraestructure/firebase/index'
import { Primitives } from '../../types/Primitives'


@injectable()
export class FirebaseDataSource {

    private _database: Database
    constructor() {
        this._database = firebase.database
    }

    protected async update(path: string, entity: object | Primitives): Promise<void> {

        return await this._database.ref(path).update(entity)
    }
    protected async remove(path: string): Promise<void> {

        return await this._database.ref(path).remove()
    }

    protected async get(path: string): Promise<any> {

        const data = (await this._database.ref(path).get()).val()
        return data
    }

    protected async exists(path: string): Promise<boolean> {
        return (await this._database.ref(path).get()).exists()
    }
}