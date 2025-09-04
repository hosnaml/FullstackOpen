const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
]

const initialUsers = [
  {
    username: 'root',
    passwordHash: bcrypt.hashSync('sekret', 10)
  }
]

const uniqueUser = {
  username: 'mluukkai',
  name: 'Matti Luukkainen',
  password: 'salainen'
}

const notUniqueUser = {
  username: 'root',
  name: 'Superuser',
  password: 'salainen'
}

const userWithOutPassword = {
  username: 'testuser',
  name: 'Test User'
}

const userWithTooShortPassword = {
  username: 'testuser',
  name: 'Test User',
  password: 'ab'
}

const nonExistingId = async () => {
  const blog = new Blog({ 
    title: 'willremovethissoon',
    author: 'temp',
    url: 'http://temp.com'
  })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs, 
  initialUsers,
  uniqueUser,
  notUniqueUser,
  userWithOutPassword,
  userWithTooShortPassword,
  nonExistingId, 
  blogsInDb, 
  usersInDb
}