import express from 'express'
import userRouter from './router/userRouter'
import handleValidationError from './error/handleValidationError'
import handleError from './error/errorHandler'
import logMethodInvocation from './logger/infoLoggerMidelware'
import { generalLogger as logger } from './logger/logger'

const PORT = process.env.PORT || 8182
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(logMethodInvocation)

app.use('/api/users', userRouter)

app.use(handleValidationError)
app.use(handleError)

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
