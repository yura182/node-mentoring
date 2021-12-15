import { generalLogger } from '../logger/logger'
import { StatusCodes } from 'http-status-codes'

function setLogLevel (req, res) {
  const { level } = req.params

  generalLogger.level = level

  res.status(StatusCodes.NO_CONTENT).end()
}

export default setLogLevel
