import { v4 as generateUUID } from 'uuid'

class User {
  constructor ({ id, login, password, age }) {
    this.id = id || generateUUID()
    this.login = login
    this.password = password
    this.age = age
    this.isDeleted = false
  }
}

export default User
