import { StatusCodes } from 'http-status-codes'
import { USER_ALREADY_EXISTS, USER_NOT_FOUND, INTERNAL_SERVER_ERROR } from './errorMessages'

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
    return res.status(responseCode).json({ errorMessage: err.message })
  }

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errorMessage: INTERNAL_SERVER_ERROR })
}

export default handleError
