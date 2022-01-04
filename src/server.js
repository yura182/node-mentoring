import app from './app'
import dotenv from 'dotenv'
import { generalLogger as logger } from './logger/logger'

dotenv.config()

const PORT = process.env.PORT

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
