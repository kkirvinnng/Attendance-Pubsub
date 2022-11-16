import { Server } from './Server'
import route from './routes'
import invalidRoute from './http-response/invalidRoute'
import { errorHandler } from './http-response/errors/errorHandler'

const server = new Server()
const app = server.getExpress()

app.use('/api/auth', route.user)
app.use('/api/teacher', route.teacher)
app.use('/api/assistant', route.assistant)
app.use('/api/students', route.student)

app.use(errorHandler)
app.use(invalidRoute)

export default app