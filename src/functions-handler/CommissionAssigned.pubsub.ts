import * as functions from 'firebase-functions'
import container from '../dependency-injection/container'
import { ContainerSymbols } from '../dependency-injection/symbols'
import { AssignCommissionSheetUseCase } from '../teachers/application/use-cases/teachers/AssignCommissionSheet.usecase'
import { CommissionAssigned } from '../teachers/domain/publisher/CommissionAssigned'

export const CommissionAssignedPubSub = functions
    .runWith({ memory: '256MB', timeoutSeconds: 300 })
    .pubsub.topic('assign_commission_sheet')
    .onPublish(async (message: functions.pubsub.Message) => {

        const { sheetId, commission }: CommissionAssigned = message.json

        const assignCommissionSheetUseCase = container.get<AssignCommissionSheetUseCase>(
            ContainerSymbols.AssignCommissionSheetUseCase
        )

        await assignCommissionSheetUseCase.run(sheetId, commission)
    })