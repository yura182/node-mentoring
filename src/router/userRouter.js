import express from 'express'
import { userModelValidator, idParameterValidator, queryParametersValidator } from '../validator/userValidator'
import {
  createUser,
  deleteUser,
  getAllUsers,
  getAutoSuggestUsers,
  getUserById,
  updateUser
} from '../controller/userController'

const router = express.Router()

router.route('/suggest')
  .get(queryParametersValidator, getAutoSuggestUsers)

router.route('/')
  .get(getAllUsers)
  .post(userModelValidator, createUser)

router.route('/:id')
  .get(idParameterValidator, getUserById)
  .put(userModelValidator, updateUser)
  .delete(idParameterValidator, deleteUser)

export default router
