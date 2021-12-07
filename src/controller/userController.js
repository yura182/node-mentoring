import { StatusCodes } from 'http-status-codes'
import * as userService from '../service/userService'

function createUser (req, res) {
  const user = userService.createUser(req.body)

  res.status(StatusCodes.CREATED).json(user)
}

function getUserById (req, res) {
  const { id } = req.params
  const user = userService.getUser(id)

  if (!user) {
    res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' })
  }

  res.json(userService.getUser(id))
}

function updateUser (req, res) {
  const { id } = req.params
  const user = userService.updateUser(id, req.body)

  res.json(user)
}

function getAutoSuggestUsers (req, res) {
  const { loginSubstring, limit } = req.query
  const users = userService.getSuggestedUsers(loginSubstring, limit)

  res.json(users)
}

function getAllUsers (req, res) {
  res.json(userService.getAllUsers())
}

function deleteUser (req, res) {
  const { id } = req.params
  const deletedUser = userService.deleteUser(id)

  res.json(deletedUser)
}

export {
  createUser,
  getUserById,
  getAutoSuggestUsers,
  updateUser,
  getAllUsers,
  deleteUser
}
