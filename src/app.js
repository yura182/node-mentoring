import express from 'express'
import userRouter from './router/userRouter'
import internalRouter from './router/internalRouter'
import validationErrorHandler from './middleware/validationErrorsMiddelware'
import dbErrorHandler from './middleware/dbErrorsMiddleware'
import globalErrorHandler from './middleware/globalErrorsMiddleware'
import { generalLogger as logger } from './logger/logger'
import { requestFileLogger, requestConsoleLogger } from './middleware/requestLogger'
import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT
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

app.listen(PORT, () => console.log(`Server started on port ${ PORT }`))

process
  .on('unhandledRejection', (reason) => {
    logger.error('Unhandled Rejection', reason)
  })
  .on('uncaughtException', err => {
    logger.error('Uncaught Exception', err)
    logger.on('finish', () => process.exit(1))
    logger.end()
  })
