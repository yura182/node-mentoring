import express from 'express'
import setLogLevel from '../controller/internalController'

const router = express.Router()

router.put('/logger/:level', setLogLevel)

export default router
