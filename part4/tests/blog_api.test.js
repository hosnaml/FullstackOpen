const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  // Create a test user that will be used as the creator for blogs
  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'testuser', passwordHash })
  await user.save()

  // Create initial blogs with the test user as creator
  const blogsWithUser = helper.initialBlogs.map(blog => ({
    ...blog,
    user: user._id
  }))
  await Blog.insertMany(blogsWithUser)

  // Update user's blogs array
  const savedBlogs = await Blog.find({})
  await User.findByIdAndUpdate(user._id, { 
    blogs: savedBlogs.map(blog => blog._id) 
  })
})



describe('when there are initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length) 
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map(e => e.title)
    assert.strictEqual(titles.includes('React patterns'), true)
  })

  test('blogs contain user information', async () => {
    const response = await api.get('/api/blogs')

    const blog = response.body[0]
    assert(blog.user)
    assert(blog.user.username)
    assert(typeof blog.user.username === 'string')
  })
})

describe('addition of a new blog', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'Async/Await Guide',
      author: 'Test Author',
      url: 'https://example.com/async-await',
      likes: 5
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
    assert(titles.includes('Async/Await Guide'))

    // Verify that the blog was assigned to a user
    assert(response.body.user)
  })

  test('a new blog gets assigned to the first user found', async () => {
    const newBlog = {
      title: 'Test Blog for User Assignment',
      author: 'Test Author',
      url: 'https://example.com/user-assignment',
      likes: 3
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    // Get the user to verify the blog was assigned correctly
    const users = await helper.usersInDb()
    const user = users[0] // Should be our test user
    
    assert(response.body.user)
    assert.strictEqual(response.body.user.toString(), user.id)
  })

  test('blog without title is not added', async () => {
    const newBlog = {  
      author: 'Test Author',   
      url: 'https://example.com/async-await',
      likes: 5 
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })

  test('a specific blog can be viewed', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToView = blogsAtStart[0]
  
  
    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    assert.deepStrictEqual(resultBlog.body, blogToView)
  })

  test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
  
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
  
    const blogsAtEnd = await helper.blogsInDb()
  
    const titles = blogsAtEnd.map(b => b.title)
    assert(!titles.includes(blogToDelete.title))
  
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
  })

})

describe('updating a blog', () => {
  test('updating the likes of a blog succeeds', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    
    const updatedData = {
      title: blogToUpdate.title,
      author: blogToUpdate.author,
      url: blogToUpdate.url,
      likes: blogToUpdate.likes + 10
    }

    const resultBlog = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedData)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(resultBlog.body.likes, blogToUpdate.likes + 10)
    assert.strictEqual(resultBlog.body.title, blogToUpdate.title)
    assert.strictEqual(resultBlog.body.author, blogToUpdate.author)

    const blogsAtEnd = await helper.blogsInDb()
    const updatedBlog = blogsAtEnd.find(blog => blog.id === blogToUpdate.id)
    assert.strictEqual(updatedBlog.likes, blogToUpdate.likes + 10)
  })

})

after(async () => {
  await mongoose.connection.close()
})