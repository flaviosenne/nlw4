import * as dotenv from "dotenv";
dotenv.config()
import 'reflect-metadata'
import express, { NextFunction, Response, Request } from 'express'
import 'express-async-errors'
import { AppError } from './errors/AppError';
import createConnection from './database'
import routes from './routes'

createConnection()
const app = express()

app.use(express.json())
app.use(routes)

app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
    if(err instanceof AppError)
    return res.status(err.statusCode).json({msg: err.message})

    return res.status(500).json({
        status: "Error",
        message: `Internal server error ${err.message}`
    })
})
export { app}