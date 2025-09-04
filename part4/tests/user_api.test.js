const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})
  await User.insertMany(helper.initialUsers)
})

describe('creating a user', () => {
  test('should add new user if the username is unique and the password is long enough', async () => {
    const response = await api
      .post('/api/users/')
      .send(helper.uniqueUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    // Verify the response contains the new user
    assert.strictEqual(response.body.username, 'mluukkai')
    assert.strictEqual(response.body.name, 'Matti Luukkainen')
    
    // Verify the user was actually saved to the database
    const usersAtEnd = await helper.usersInDb()
    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes('mluukkai'))
  })

  test('should fail if the username is not unique', async () => {
    // Try to create a user with username 'root' (which already exists from initialUsers)
    await api
      .post('/api/users/')
      .send(helper.notUniqueUser)
      .expect(400)
  })

  test('should fail if the password is missing', async () => {
    await api
      .post('/api/users/')
      .send(helper.userWithOutPassword)
      .expect(400)
  })

  test('should fail if the password is too short', async () => {
    await api
      .post('/api/users/')
      .send(helper.userWithTooShortPassword)
      .expect(400)
  })
})

after(async () => {
  await mongoose.connection.close()
})