import * as functions from 'firebase-functions'
import container from '../dependency-injection/container'
import { ContainerSymbols } from '../dependency-injection/symbols'
import { StudentsAttendanceUseCase } from '../teachers/application/use-cases/students/StudentsAttendance.usecase'
import { StudentsAttendancePub } from '../teachers/domain/publisher/StudentsAttendance'

export const StudentsAttendancePubsub = functions
    .runWith({ memory: '256MB', timeoutSeconds: 300 })
    .pubsub.topic('students_attendance')
    .onPublish(async (message: functions.pubsub.Message) => {

        const msg: StudentsAttendancePub = message.json

        const studentsAttendanceUseCase = container.get<StudentsAttendanceUseCase>(
            ContainerSymbols.StudentsAttendanceUseCase
        )

        await studentsAttendanceUseCase.run(msg.sheetId, msg.classAttendance)
    })