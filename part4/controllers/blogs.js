const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})
  
blogsRouter.get('/:id', async (request, response) => {
  try {
    const blog = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1 })
    if (blog) {
      response.json(blog)
    } else {
      response.status(404).end()
    }
  } catch (error) {
    response.status(400).json({ error: error.message })
  }
})

blogsRouter.post('/', async (request, response) => {
  try {
    const body = request.body

    // Check if user is authenticated
    if (!request.user) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: request.user._id
    })

    const savedBlog = await blog.save()
    await User.findByIdAndUpdate(request.user._id, { 
      $push: { blogs: savedBlog._id } 
    })

    // Populate the user field before returning
    const populatedBlog = await Blog.findById(savedBlog._id).populate('user', { username: 1, name: 1 })

    response.status(201).json(populatedBlog)
  } catch(exception) {
    response.status(400).json({ error: exception.message })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id, 
      request.body, 
      { new: true, runValidators: true }
    )
    
    if (updatedBlog) {
      response.json(updatedBlog)
    } else {
      response.status(404).end()
    }
  } catch (error) {
    response.status(400).json({ error: error.message })
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    if (!request.user) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    
    const userid = request.user._id
    const blog = await Blog.findById(request.params.id)
    
    if (!blog) {
      return response.status(404).json({ error: 'blog not found' })
    }
    
    if (blog.user.toString() === userid.toString()) {
      await Blog.findByIdAndDelete(request.params.id)
      response.status(204).end()
    } else {
      response.status(403).json({ error: 'not authorized to delete this blog' })
    }
  } catch (error) {
    response.status(400).json({ error: error.message })
  }

  
})

module.exports = blogsRouter