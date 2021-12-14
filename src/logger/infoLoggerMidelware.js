import { methodInvocationLogger as logger }  from './logger'

const LOG_MESSAGE_TEMPLATE = 'Method: %s, Status: %s, URL: %s, Body: %s, Params: %s, Query params: %s'

function logMethodInvocation (req, res, next) {
  res.on('finish', () => {
    const { method, originalUrl, body, params, query } = req
    const { statusCode } = res

    logger.debug(LOG_MESSAGE_TEMPLATE, method, statusCode, originalUrl,
      JSON.stringify(body), JSON.stringify(params), JSON.stringify(query))
  })

  next()
}

export default logMethodInvocation
