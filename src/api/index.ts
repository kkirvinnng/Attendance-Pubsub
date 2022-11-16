import { Server } from './Server'
import route from './routes'
import invalidRoute from './http-response/invalidRoute'
import { errorHandler } from './http-response/errors/errorHandler'

const server = new Server()
const app = server.getExpress()

app.use('/auth', route.user)
app.use('/teacher', route.teacher)
app.use('/assistant', route.assistant)
app.use('/students', route.student)

app.use(errorHandler)
app.use(invalidRoute)

export default app