import defaultUsers from '../db/users'
import testUsers from '../../test/integration/db/testUsers'

const users = process.env.NODE_ENV === 'test' ? testUsers : defaultUsers

function saveUser (user) {
  users.set(user.id, user)

  return user
}

function getUser (id) {
  const user = users.get(id)

  if (user && !user.isDeleted) {
    return users.get(id)
  }
}

function getUserByLogin (login) {
  const allUsers = Array.from(getUsers())

  return allUsers
    .find(user => user.isDeleted === false && user.login === login)
}

function getUsers () {
  return Array.from(users.values())
}

function deleteUser (id) {
  const user = users.get(id)

  user.isDeleted = true

  return user
}

export {
  saveUser,
  getUser,
  getUsers,
  getUserByLogin,
  deleteUser
}
