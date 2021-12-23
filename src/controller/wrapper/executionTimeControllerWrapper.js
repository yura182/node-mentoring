import { consoleLogger as logger } from '../../logger/logger'

const LOG_MESSAGE_TEMPLATE = 'Method: %s, Status: %s, URL: %s, Execution time: %sms'

const measureExecTime = originalMethod => {
  return (req, res, next) => {
    const startTime = process.hrtime.bigint()

    res.on('finish', () => {
      const { method, originalUrl } = req
      const { statusCode } = res

      const duration = Number(process.hrtime.bigint() - startTime) / 1000000
      logger.debug(LOG_MESSAGE_TEMPLATE, method, statusCode, originalUrl, duration)
    })

    originalMethod(req, res, next)
  }
}

export default measureExecTime
