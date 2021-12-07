import express from 'express'
import userRouter from './router/userRouter'
import handleValidationError from './error/handleValidationError'
import handleError from './error/errorHandler'

const PORT = process.env.PORT || 8182
const app = express()

app.use(express.json())

app.use('/api/users', userRouter)

app.use(handleValidationError)
app.use(handleError)

app.listen(PORT, () => console.log(`Server started on port ${ PORT }`))
