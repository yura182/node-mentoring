import { StatusCodes } from 'http-status-codes'

function handleValidationError (err, req, res, next) {
  if (err && err.error && err.error.isJoi) {
    const errorMessages = err.error.details.map(details => {
      return { errorMessage: details.message }
    })

    res.status(StatusCodes.BAD_REQUEST).json({ errors: errorMessages })
  } else {
    return next(err)
  }
}

export default handleValidationError
