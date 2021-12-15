import { StatusCodes } from 'http-status-codes'
import { USER_ALREADY_EXISTS, USER_NOT_FOUND, INTERNAL_SERVER_ERROR } from './errorMessages'
import { generalLogger as logger } from '../logger/logger'

const ERROR_MESSAGE = 'Error occurred.'

const statusCodeResponses = {
  [USER_NOT_FOUND]: StatusCodes.NOT_FOUND,
  [USER_ALREADY_EXISTS]: StatusCodes.BAD_REQUEST
}

function handleError (err, req, res, next) {
  if (!err) {
    return next()
  }

  const responseCode = statusCodeResponses[err.message]
  if (responseCode) {
    logger.warn(ERROR_MESSAGE, err)
    return res.status(responseCode).json({ errorMessage: err.message })
  }

  logger.error(ERROR_MESSAGE, err)
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errorMessage: INTERNAL_SERVER_ERROR })
}

export default handleError
