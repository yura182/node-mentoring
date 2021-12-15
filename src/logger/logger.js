import { createLogger, format, transports } from 'winston'

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss.SSS'

const print = format.printf(info => {
  let message = `[${ info.timestamp }] ${ info.level }: ${ info.message }`

  if (info.context) {
    message = `${message}. Error in method: [${info.context.method}], method params: ${JSON.stringify(info.context.params)}.`
  }

  if (info.stack) {
    message = `${message}\n${info.stack}`
  }

  return sanitizeLogMessage(message)
})

const methodInvocationLogger = createLogger({
  format: format.combine(
    format.colorize(),
    format.splat(),
    format.timestamp({ format: DATE_TIME_FORMAT }),
    print
  ),
  transports: [new transports.Console()],
  exitOnError: false,
  level: 'debug'
})

const generalLogger = createLogger({
  transports: [
    new transports.Console({
      format: format.combine(
        format.errors({ stack: true }),
        format.colorize(),
        format.timestamp({ format: DATE_TIME_FORMAT }),
        print
      )
    }),
    new transports.File({
      filename: 'logs/log.log',
      format: format.combine(
        format.errors({ stack: true }),
        format.timestamp({ format: DATE_TIME_FORMAT }),
        print
      )
    })
  ],
  exitOnError: false,
  level: 'debug'
})

function sanitizeLogMessage (message) {
  return message.replace(new RegExp('"password":".+?"'), '"password":"*****"')
}

export {
  methodInvocationLogger,
  generalLogger
}
