import { createLogger, format, transports } from 'winston'

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss.SSS'

const sanitizeLogMessage = format(info => {
  const { message } = info
  info.message = message.replace(new RegExp('"password":".+?"'), '"password":"*****"')
  return info
})

const methodInvocationLogger = createLogger({
  format: format.combine(
    format.colorize(),
    format.splat(),
    format.timestamp({ format: DATE_TIME_FORMAT }),
    sanitizeLogMessage(),
    format.printf(info => `[${info.timestamp}] ${info.level}: ${info.message}`)
  ),
  transports: [new transports.Console()],
  exitOnError: false,
  level: 'debug'
})

export {
  methodInvocationLogger
}
