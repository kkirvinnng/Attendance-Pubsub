import { Router } from 'express'
import container from '../../dependency-injection/container'
import { ContainerSymbols } from '../../dependency-injection/symbols'
import { LoadStudentsController } from '../controllers/students/LoadStudents.ctrl.usecase'
import { StudentsAttendanceController } from '../controllers/students/StudentsAttendance.ctrl'
import { verifyApiKey } from '../middleware/verifyApiKey'


const loadStudentsController = container.get<LoadStudentsController>(
    ContainerSymbols.LoadStudentsController
)

const studentsAttendanceController = container.get<StudentsAttendanceController>(
    ContainerSymbols.StudentsAttendanceController
)

const route = Router()
route.use(verifyApiKey)

route.put('/', loadStudentsController.run.bind(loadStudentsController))
route.put('/attendance', studentsAttendanceController.run.bind(studentsAttendanceController))


export default route
