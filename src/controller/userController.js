import { StatusCodes } from 'http-status-codes'
import * as userService from '../service/userService'

function createUser (req, res, next) {
  const userData = req.body
  try {
    const user = userService.createUser(userData)

    res.status(StatusCodes.CREATED).json(user)
  } catch (error) {
    error.context = getErrorContext(req, error)
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
    error.context = getErrorContext(req, error)
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
    error.context = getErrorContext(req, error)
    return next(error)
  }
}

function getAutoSuggestUsers (req, res, next) {
  const { loginSubstring, limit } = req.query
  try {
    const users = userService.getSuggestedUsers(loginSubstring, limit)

    res.json(users)
  } catch (error) {
    error.context = getErrorContext(req, error)
    return next(error)
  }
}

function getAllUsers (req, res, next) {
  try {
    res.json(userService.getAllUsers())
  } catch (error) {
    error.context = getErrorContext(req, error)
    return next(error)
  }
}

function deleteUser (req, res, next) {
  const { id } = req.params
  try {
    const deletedUser = userService.deleteUser(id)

    res.json(deletedUser)
  } catch (error) {
    error.context = getErrorContext(req, error)
    return next(error)
  }
}

function getErrorContext (req, error) {
  return {
    method: req.method,
    url: req.originalUrl,
    message: error.message
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
