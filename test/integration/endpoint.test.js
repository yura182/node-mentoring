import { StatusCodes } from 'http-status-codes'
import app from '../../src/app'
import request from 'supertest'
import { reloadTestDB } from './db/testUsers'

beforeEach(() => {
  reloadTestDB()
})

describe('Create user', () => {
  test('should return expected body and HTTP status when create user', done => {
    const userData = getUserData('Tom', '123456qwerty', 25)
    const expectedUser = getExpectedUser('Tom', '123456qwerty', 25, false)

    request(app)
      .post('/api/users')
      .send(userData)
      .expect(StatusCodes.CREATED)
      .end((error, response) => {
        if (error) {
          return done(error)
        }

        expect(response.body).toEqual(expect.objectContaining(expectedUser))
        done()
      })
  })

  test('should return expected body and HTTP status when validation failed', done => {
    const userData = getUserData('', '', 0)

    const expectedBody = {
      errors: [
        { errorMessage: '"login" is not allowed to be empty' },
        { errorMessage: '"password" is not allowed to be empty' },
        { errorMessage: '"age" must be greater than or equal to 4' }
      ]
    }

    request(app)
      .post('/api/users')
      .send(userData)
      .expect(StatusCodes.BAD_REQUEST)
      .end((error, response) => {
        if (error) {
          return done(error)
        }

        expect(response.body).toEqual(expectedBody)
        done()
      })
  }
  )

  function getUserData (login, password, age) {
    return Object.freeze({ login, password, age })
  }

  function getExpectedUser (login, password, age, isDeleted) {
    return Object.freeze({ login, password, age, isDeleted })
  }
})

describe('Get user by id', () => {
  test('should return expected body and HTTP status when retrieve user by id', done => {
    const userId = '6d5a13ca-f689-4529-8c58-be927821a068'
    const expectedUser = {
      'id': userId,
      'login': 'helloWorld',
      'password': '123456qwerty',
      'age': 25,
      'isDeleted': false
    }

    request(app)
      .get(`/api/users/${ userId }`)
      .expect(StatusCodes.OK, expectedUser, done)
  })

  test('should return expected body and HTTP status when user was not found', done => {
    const userId = '7d5a13ca-f686-4529-8c58-be927821a068'
    const expectedBody = { message: 'User not found' }

    request(app)
      .get(`/api/users/${ userId }`)
      .expect(StatusCodes.NOT_FOUND, expectedBody, done)
  })

  test('should return expected body and HTTP status when validation failed', done => {
    const userId = 'notValidUserId'

    const expectedBody = { errors: [{ errorMessage: '"id" must be a valid GUID' }] }

    request(app)
      .get(`/api/users/${ userId }`)
      .expect(StatusCodes.BAD_REQUEST, expectedBody, done)
  })
})

describe('Get all users', () => {
  test('should return expected user when retrieve all users', done => {
    const expectedBody = [
      {
        'id': '6d5a13ca-f689-4529-8c58-be927821a068',
        'login': 'helloWorld',
        'password': '123456qwerty',
        'age': 25,
        'isDeleted': false
      },
      {
        'id': 'c3455a71-417a-4fdb-a33a-52f68d7dd31a',
        'login': 'John',
        'password': '123456qwerty',
        'age': 40,
        'isDeleted': false
      }
    ]

    request(app)
      .get('/api/users')
      .expect(StatusCodes.OK, expectedBody, done)
  })
})
