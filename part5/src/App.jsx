import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setMessage({ text: `Hello ${credentials.username}`, type: 'success' })
    } catch (exception) {
      setMessage({ text: 'Wrong credentials', type: 'error' })
    }
  }

  const handleLogout = () => {
    setMessage({ text: `Goodbye ${user.name}`, type: 'success' })
    setUser(null)
    window.localStorage.removeItem('loggedBlogAppUser')
  }
  const handleCreateBlog = async (blog) => {
    const newBlog = await blogService.create(blog)
    setBlogs(blogs.concat(newBlog))
    setMessage({ text: `A new blog "${newBlog.title}" by ${newBlog.author} added`, type: 'success' })
  }

  return (
    <div>
      <h1>blogs</h1>
      <Notification message={message} setMessage={setMessage} />
      {!user ?
        <LoginForm onLogin={handleLogin} />
        :
        <div>
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
          <BlogForm onCreate={handleCreateBlog} />
        </div>
        
      }
    </div>
  )
}

export default App