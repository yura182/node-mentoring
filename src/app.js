import express from 'express'
import userRouter from './router/userRouter'
import internalRouter from './router/internalRouter'
import validationErrorHandler from './middleware/validationErrorsMiddelware'
import dbErrorHandler from './middleware/dbErrorsMiddleware'
import globalErrorHandler from './middleware/globalErrorsMiddleware'
import { requestFileLogger, requestConsoleLogger } from './middleware/requestLogger'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(requestFileLogger)
app.use(requestConsoleLogger)

app.use('/api/users', userRouter)
app.use('/api/internal', internalRouter)

app.use(validationErrorHandler)
app.use(dbErrorHandler)
app.use(globalErrorHandler)

export default app
