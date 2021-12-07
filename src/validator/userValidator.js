import Joi from 'joi'
import { createValidator } from 'express-joi-validation'

const validator = createValidator({ passError: true })

const userModelSchema = Joi.object({
  login: Joi.string()
    .alphanum()
    .min(2)
    .max(60)
    .required(),
  password: Joi.string()
    .alphanum()
    .min(6)
    .pattern(new RegExp('\\d+'))
    .pattern(new RegExp('[a-zA-Z]+'))
    .required(),
  age: Joi.number()
    .min(4)
    .max(130)
    .required()
})

const idParameterSchema = Joi.object({
  id: Joi.string()
    .uuid()
})

const queryParametersSchema = Joi.object({
  loginSubstring: Joi.string()
    .alphanum()
    .required(),
  limit: Joi.number()
    .positive()
    .required()
})

const userModelValidator = validator.body(userModelSchema)
const idParameterValidator = validator.params(idParameterSchema)
const queryParametersValidator = validator.query(queryParametersSchema)

export {
  userModelValidator,
  idParameterValidator,
  queryParametersValidator
}
