import { StatusCodes } from 'http-status-codes'
import * as userService from '../service/userService'

function createUser (req, res, next) {
  const userData = req.body
  try {
    const user = userService.createUser(userData)

    res.status(StatusCodes.CREATED).json(user)
  } catch (error) {
    error.context = getErrorContext(createUser.name, { userData })
    return next(error)
  }
}

function getUserById (req, res, next) {
  const { id } = req.params
  try {
    const user = userService.getUser(id)

    if (!user) {
      res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' })
    }

    res.json(user)
  } catch (error) {
    error.context = getErrorContext(getUserById.name, { id })
    return next(error)
  }
}

function updateUser (req, res, next) {
  const { id } = req.params
  const userData = req.body
  try {
    const user = userService.updateUser(id, userData)

    res.json(user)
  } catch (error) {
    error.context = getErrorContext(updateUser.name, { id, userData })
    return next(error)
  }
}

function getAutoSuggestUsers (req, res, next) {
  const { loginSubstring, limit } = req.query
  try {
    const users = userService.getSuggestedUsers(loginSubstring, limit)

    res.json(users)
  } catch (error) {
    error.context = getErrorContext(getAutoSuggestUsers.name, { loginSubstring, limit })
    return next(error)
  }
}

function getAllUsers (req, res, next) {
  try {
    res.json(userService.getAllUsers())
  } catch (error) {
    error.context = getErrorContext(getAllUsers.name, {})
    return next(error)
  }
}

function deleteUser (req, res, next) {
  const { id } = req.params
  try {
    const deletedUser = userService.deleteUser(id)

    res.json(deletedUser)
  } catch (error) {
    error.context = getErrorContext(deleteUser.name, { id })
    return next(error)
  }
}

function getErrorContext (method, params) {
  return {
    method,
    params
  }
}

export {
  createUser,
  getUserById,
  getAutoSuggestUsers,
  updateUser,
  getAllUsers,
  deleteUser
}
