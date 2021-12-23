import { StatusCodes } from 'http-status-codes'
import { USER_ALREADY_EXISTS, USER_NOT_FOUND } from '../error/errorMessages'
import { generalLogger as logger } from '../logger/logger'

const ERROR_MESSAGE = 'Error occurred.'

const statusCodeResponses = {
  [USER_NOT_FOUND]: StatusCodes.NOT_FOUND,
  [USER_ALREADY_EXISTS]: StatusCodes.BAD_REQUEST
}

function handleError (err, req, res, next) {
  const responseCode = statusCodeResponses[err.message]
  if (responseCode) {
    logger.warn(ERROR_MESSAGE, err)
    return res.status(responseCode).json({ errorMessage: err.message })
  }

  return next(err)
}

export default handleError
