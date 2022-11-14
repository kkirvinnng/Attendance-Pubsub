import { ClassPrimitives } from '../../../shared/types/ClassMethodsAndProperties'
import { Commission } from '../entities/Commission'

export interface CommissionAssigned {
    sheetId: string,
    commission: ClassPrimitives<Commission>
}