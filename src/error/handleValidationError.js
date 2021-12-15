import { StatusCodes } from 'http-status-codes'
import { generalLogger as logger } from '../logger/logger'

const ERROR_MESSAGE = 'Error occurred.'

function handleValidationError (err, req, res, next) {
  if (err && err.error && err.error.isJoi) {
    const errorMessages = err.error.details.map(details => {
      return { errorMessage: details.message }
    })

    logger.warn(ERROR_MESSAGE, err.error)
    res.status(StatusCodes.BAD_REQUEST).json({ errors: errorMessages })
  } else {
    return next(err)
  }
}

export default handleValidationError
