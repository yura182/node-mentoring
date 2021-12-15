import { methodInvocationLogger as logger }  from './logger'

const LOG_MESSAGE_TEMPLATE = 'Method: %s, Status: %s, URL: %s, Body: %s, Params: %s, Query params: %s, Execution time: %sms'

function logMethodInvocation (req, res, next) {
  const startTime = Date.now();
  res.on('finish', () => {
    const { method, originalUrl, body, params, query } = req
    const { statusCode } = res

    const duration = Date.now() - startTime
    logger.debug(LOG_MESSAGE_TEMPLATE, method, statusCode, originalUrl,
      JSON.stringify(body), JSON.stringify(params), JSON.stringify(query), duration)
  })

  next()
}

export default logMethodInvocation
