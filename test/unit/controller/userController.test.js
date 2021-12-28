import { StatusCodes } from 'http-status-codes'
import * as userController from '../../../src/controller/userController'
import * as userService from '../../../src/service/userService'

jest.mock('../../../src/service/userService')

const ERROR_MESSAGE = 'ErrorMessage'
const ID = 'userId'

const response = {
  status: jest.fn(),
  json: jest.fn()
}
const next = jest.fn()
const user = Object.freeze({ name: 'user' })
const error = new Error(ERROR_MESSAGE)

beforeEach(() => {
  response.status.mockReturnValue(response)
  response.json.mockReturnValue(response)
})

afterEach(() => {
  jest.clearAllMocks()
})

describe('Create user endpoint', () => {
  const METHOD = 'GET'
  const URL = 'createUserURL'

  const userData = Object.freeze({ name: 'userData' })
  const request = Object.freeze({
    body: userData,
    method: METHOD,
    originalUrl: URL
  })

  const expectedErrorContext = Object.freeze({
    method: METHOD,
    url: URL,
    message: ERROR_MESSAGE
  })

  beforeAll(() => {
    userService.createUser.mockReturnValue(user)
  })

  afterAll(() => {
    jest.resetAllMocks()
  })

  test('should return expected HTTP status in response when create user', () => {
    userController.createUser(request, response, next)

    expect(response.status).toHaveBeenCalledWith(StatusCodes.CREATED)
  })

  test('should return expected body in response when create user', () => {
    userController.createUser(request, response, next)

    expect(response.json).toHaveBeenCalledWith(user)
  })

  test('should call user service with expected argument when create user', () => {
    userController.createUser(request, response, next)

    expect(userService.createUser).toHaveBeenCalledWith(userData)
  })

  test('should call next callback with expected error when create user failed', () => {
    userService.createUser.mockImplementation(() => {
      throw new Error(ERROR_MESSAGE)
    })

    userController.createUser(request, response, next)

    expect(next).toHaveBeenCalledWith(error)
  })

  test('should call next callback with expected error context when create user failed', () => {
    userService.createUser.mockImplementation(() => {
      throw new Error(ERROR_MESSAGE)
    })

    userController.createUser(request, response, next)

    expect(next).toHaveBeenCalledWith(expect.objectContaining({ context: expectedErrorContext }))
  })
})

describe('Get user by id endpoint', () => {
  const METHOD = 'GET'
  const URL = 'getUserURL'

  const request = Object.freeze({
    params: {
      id: ID
    },
    method: METHOD,
    originalUrl: URL
  })

  const expectedErrorContext = Object.freeze({
    method: METHOD,
    url: URL,
    message: ERROR_MESSAGE
  })

  beforeAll(() => {
    userService.getUser.mockReturnValue(user)
  })

  afterAll(() => {
    jest.resetAllMocks()
  })

  test('should return expected body in response when retrieve user by id', () => {
    userController.getUserById(request, response, next)

    expect(response.json).toHaveBeenCalledWith(user)
  })

  test('should return default HTTP status in response when retrieve user by id', () => {
    userController.getUserById(request, response, next)

    expect(response.status).not.toHaveBeenCalled()
  })

  test('should call user service with expected argument when retrieve user by id', () => {
    userController.getUserById(request, response, next)

    expect(userService.getUser).toHaveBeenCalledWith(ID)
  })

  test('should return expected HTTP status in response when user was not found by id', () => {
    userService.getUser.mockReturnValue(undefined)

    userController.getUserById(request, response, next)

    expect(response.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND)
  })

  test('should return expected body in response when user was not found by id', () => {
    userService.getUser.mockReturnValue(undefined)

    userController.getUserById(request, response, next)

    expect(response.json).toHaveBeenCalledWith({ message: 'User not found' })
  })

  test('should call next callback with expected error when retrieve user by id failed', () => {
    userService.getUser.mockImplementation(() => {
      throw new Error(ERROR_MESSAGE)
    })

    userController.getUserById(request, response, next)

    expect(next).toHaveBeenCalledWith(error)
  })

  test('should call next callback with expected error context when retrieve user by id failed', () => {
    userService.getUser.mockImplementation(() => {
      throw new Error(ERROR_MESSAGE)
    })

    userController.getUserById(request, response, next)

    expect(next).toHaveBeenCalledWith(expect.objectContaining({ context: expectedErrorContext }))
  })
})

describe('Update user endpoint', () => {
  const METHOD = 'PUT'
  const URL = 'updateUserURL'

  const userData = Object.freeze({ name: 'userData' })
  const request = Object.freeze({
    params: {
      id: ID
    },
    body: userData,
    method: METHOD,
    originalUrl: URL
  })

  const expectedErrorContext = Object.freeze({
    method: METHOD,
    url: URL,
    message: ERROR_MESSAGE
  })

  beforeAll(() => {
    userService.updateUser.mockReturnValue(user)
  })

  afterAll(() => {
    jest.resetAllMocks()
  })

  test('should return expected body in response when update user', () => {
    userController.updateUser(request, response, next)

    expect(response.json).toHaveBeenCalledWith(user)
  })

  test('should return default HTTP status in response when update user', () => {
    userController.updateUser(request, response, next)

    expect(response.status).not.toHaveBeenCalled()
  })

  test('should call user service with expected arguments when update user', () => {
    userController.updateUser(request, response, next)

    expect(userService.updateUser).toHaveBeenCalledWith(ID, userData)
  })

  test('should call next callback with expected error when update user failed', () => {
    userService.updateUser.mockImplementation(() => {
      throw new Error(ERROR_MESSAGE)
    })

    userController.updateUser(request, response, next)

    expect(next).toHaveBeenCalledWith(error)
  })

  test('should call next callback with expected error context when update user failed', () => {
    userService.updateUser.mockImplementation(() => {
      throw new Error(ERROR_MESSAGE)
    })

    userController.updateUser(request, response, next)

    expect(next).toHaveBeenCalledWith(expect.objectContaining({ context: expectedErrorContext }))
  })
})

describe('Get auto suggested users endpoint', () => {
  const METHOD = 'GET'
  const URL = 'getAutoSuggestedUsersURL'
  const LOGIN_SUBSTRING = 'loginSubstring'
  const LIMIT = '10'

  const request = Object.freeze({
    query: {
      loginSubstring: LOGIN_SUBSTRING,
      limit: LIMIT
    },
    method: METHOD,
    originalUrl: URL
  })

  const expectedErrorContext = Object.freeze({
    method: METHOD,
    url: URL,
    message: ERROR_MESSAGE
  })

  beforeAll(() => {
    userService.getSuggestedUsers.mockReturnValue([user])
  })

  afterAll(() => {
    jest.resetAllMocks()
  })

  test('should return expected body in response when retrieve auto suggested users', () => {
    userController.getAutoSuggestUsers(request, response, next)

    expect(response.json).toHaveBeenCalledWith([user])
  })

  test('should return default HTTP status in response when retrieve auto suggested users', () => {
    userController.getAutoSuggestUsers(request, response, next)

    expect(response.status).not.toHaveBeenCalled()
  })

  test('should call user service with expected arguments when retrieve auto suggested users', () => {
    userController.getAutoSuggestUsers(request, response, next)

    expect(userService.getSuggestedUsers).toHaveBeenCalledWith(LOGIN_SUBSTRING, LIMIT)
  })

  test('should call next callback with expected error when retrieve auto suggested users failed', () => {
    userService.getSuggestedUsers.mockImplementation(() => {
      throw new Error(ERROR_MESSAGE)
    })

    userController.getAutoSuggestUsers(request, response, next)

    expect(next).toHaveBeenCalledWith(error)
  })

  test('should call next callback with expected error context when retrieve auto suggested users failed', () => {
    userService.getSuggestedUsers.mockImplementation(() => {
      throw new Error(ERROR_MESSAGE)
    })

    userController.getAutoSuggestUsers(request, response, next)

    expect(next).toHaveBeenCalledWith(expect.objectContaining({ context: expectedErrorContext }))
  })
})

describe('Get all users endpoint', () => {
  const METHOD = 'GET'
  const URL = 'getAllUsersURL'

  const request = Object.freeze({
    method: METHOD,
    originalUrl: URL
  })

  const expectedErrorContext = Object.freeze({
    method: METHOD,
    url: URL,
    message: ERROR_MESSAGE
  })

  beforeAll(() => {
    userService.getAllUsers.mockReturnValue([user])
  })

  afterAll(() => {
    jest.resetAllMocks()
  })

  test('should return expected body in response when retrieve all users', () => {
    userController.getAllUsers(request, response, next)

    expect(response.json).toHaveBeenCalledWith([user])
  })

  test('should return default HTTP status in response when retrieve all users', () => {
    userController.getAllUsers(request, response, next)

    expect(response.status).not.toHaveBeenCalled()
  })

  test('should call user service when retrieve all users', () => {
    userController.getAllUsers(request, response, next)

    expect(userService.getAllUsers).toHaveBeenCalled()
  })

  test('should call next callback with expected error when retrieve all users failed', () => {
    userService.getAllUsers.mockImplementation(() => {
      throw new Error(ERROR_MESSAGE)
    })

    userController.getAllUsers(request, response, next)

    expect(next).toHaveBeenCalledWith(error)
  })

  test('should call next callback with expected error context when retrieve all users failed', () => {
    userService.getAllUsers.mockImplementation(() => {
      throw new Error(ERROR_MESSAGE)
    })

    userController.getAllUsers(request, response, next)

    expect(next).toHaveBeenCalledWith(expect.objectContaining({ context: expectedErrorContext }))
  })
})

describe('Delete user endpoint', () => {
  const METHOD = 'DELETE'
  const URL = 'deleteUserUrl'

  const request = Object.freeze({
    params: {
      id: ID
    },
    method: METHOD,
    originalUrl: URL
  })

  const expectedErrorContext = Object.freeze({
    method: METHOD,
    url: URL,
    message: ERROR_MESSAGE
  })

  beforeAll(() => {
    userService.deleteUser.mockReturnValue(user)
  })

  afterAll(() => {
    jest.resetAllMocks()
  })

  test('should return expected body in response when delete user', () => {
    userController.deleteUser(request, response, next)

    expect(response.json).toHaveBeenCalledWith(user)
  })

  test('should return default HTTP status in response when delete user', () => {
    userController.deleteUser(request, response, next)

    expect(response.status).not.toHaveBeenCalled()
  })

  test('should call user service with expected argument when delete user', () => {
    userController.deleteUser(request, response, next)

    expect(userService.deleteUser).toHaveBeenCalledWith(ID)
  })

  test('should call next callback with expected error when delete user failed', () => {
    userService.deleteUser.mockImplementation(() => {
      throw new Error(ERROR_MESSAGE)
    })

    userController.deleteUser(request, response, next)

    expect(next).toHaveBeenCalledWith(error)
  })

  test('should call next callback with expected error context when delete user failed', () => {
    userService.deleteUser.mockImplementation(() => {
      throw new Error(ERROR_MESSAGE)
    })

    userController.deleteUser(request, response, next)

    expect(next).toHaveBeenCalledWith(expect.objectContaining({ context: expectedErrorContext }))
  })
})
