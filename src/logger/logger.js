import { createLogger, format, transports } from 'winston'

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss.SSS'

const sanitizeLogMessage = format(info => {
  const { message } = info
  info.message = message.replace(new RegExp('"password":".+?"'), '"password":"*****"')
  return info
})

const print = format.printf(info => {
  const message = `[${ info.timestamp }] ${ info.level }: ${ info.message }`

  return info.stack
    ? `${message}\n${info.stack}`
    : message
})

const methodInvocationLogger = createLogger({
  format: format.combine(
    format.colorize(),
    format.splat(),
    format.timestamp({ format: DATE_TIME_FORMAT }),
    sanitizeLogMessage(),
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

export {
  methodInvocationLogger,
  generalLogger
}
