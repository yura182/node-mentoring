import { generalLogger as logger } from '../logger/logger'
import { StatusCodes } from 'http-status-codes'
import { INTERNAL_SERVER_ERROR } from '../error/errorMessages'

const ERROR_MESSAGE = 'Error occurred.'

function handleError (err, req, res) {
  logger.error(ERROR_MESSAGE, err)
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errorMessage: INTERNAL_SERVER_ERROR })
}

export default handleError
