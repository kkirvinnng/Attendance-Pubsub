import express, { NextFunction, Response, Request } from 'express'
import helmet from 'helmet'
import * as http from 'http'
import cors from 'cors'

export class Server {
    private express: express.Express
    private httpServer?: http.Server

    constructor() {
        this.express = express()
        this.express.use(express.json())
        this.express.use(helmet())
        this.express.use(cors())
        this.express.use((req: Request, res: Response, next: NextFunction) => {
            console.log(`${req.method} ${req.url} 🚧🚦`)
            next()
        })
    }

    getExpress() {
        return this.express
    }

    listen(port: string) {
        this.httpServer = this.express.listen(port, () => {
            console.log(`Node process: ${process.pid}`)
            console.log(`Port ${port}`)
        })
    }

    getHTTPServer() {
        return this.httpServer
    }

}