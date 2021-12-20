import morgan from 'morgan'
import fs from 'fs'
import path from 'path'

const fileLogStream = fs.createWriteStream(path.join(__dirname, '../../logs', 'access.log'), { flags: 'a' })
const format = 'Method: :method, URL: :url, Status: :status, Time: :response-time ms'

const requestFileLogger = morgan(format, { stream: fileLogStream })
const requestConsoleLogger = morgan(format)

export {
  requestFileLogger,
  requestConsoleLogger
}
