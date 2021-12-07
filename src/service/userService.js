import User from '../model/user'
import * as userRepository from '../repository/userRepository'
import { USER_ALREADY_EXISTS, USER_NOT_FOUND } from '../error/errorMessages'

function createUser (userData) {
  validateUniqueUserLogin(userData)

  const user = new User(userData)

  return userRepository.saveUser(user)
}

function getUser (id) {
  return userRepository.getUser(id)
}

function updateUser (id, userData) {
  validateUserExistsWithProvidedId(id)
  validateUniqueUpdatedUserLogin(userData, id)

  userData.id = id
  const user = new User(userData)

  return userRepository.saveUser(user)
}

function getSuggestedUsers (loginSubstring, limit) {
  const allUsers = userRepository.getUsers()
  const suggestedUsers = allUsers
    .filter(user => user.isDeleted === false)
    .filter(user => user.login.includes(loginSubstring))
    .sort((firstUser, secondUser) => firstUser.login.localeCompare(secondUser.login))

  return suggestedUsers.slice(0, limit)
}

function getAllUsers () {
  return userRepository.getUsers()
}

function deleteUser (id) {
  validateUserExistsWithProvidedId(id)

  return userRepository.deleteUser(id)
}

function validateUniqueUserLogin (userData) {
  const existingUser = userRepository.getUserByLogin(userData.login)
  if (existingUser) {
    throw new Error(USER_ALREADY_EXISTS)
  }
}

function validateUserExistsWithProvidedId (id) {
  const existingUser = userRepository.getUser(id)
  if (!existingUser) {
    throw new Error(USER_NOT_FOUND)
  }
}

function validateUniqueUpdatedUserLogin (userData, id) {
  const existingUserByLogin = userRepository.getUserByLogin(userData.login)
  if (existingUserByLogin && existingUserByLogin.id !== id) {
    throw new Error(USER_ALREADY_EXISTS)
  }
}

export {
  createUser,
  getUser,
  getSuggestedUsers,
  updateUser,
  getAllUsers,
  deleteUser
}
