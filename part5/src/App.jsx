import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = useRef()

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
      setMessage({ text: `Hello ${user.username}`, type: 'success' })
    } catch (exception) {
      setMessage({ text: 'Wrong credentials', type: 'error' })
    }
  }

  const handleLogout = () => {
    setMessage({ text: `Goodbye ${user.username}`, type: 'success' })
    setUser(null)
    window.localStorage.removeItem('loggedBlogAppUser')
  }
  
  const handleCreateBlog = async (blog) => {
    blogFormRef.current.toggleVisibility()
    const newBlog = await blogService.create(blog)
    setBlogs(blogs.concat(newBlog))
    setMessage({ text: `A new blog "${newBlog.title}" by ${newBlog.author} added`, type: 'success' })
  }

  return (
    <div>
      <h1>blogs</h1>
      <Notification message={message} setMessage={setMessage} />
      {!user ?
      <Togglable buttonLabel="Log in">
          <LoginForm
           onLogin={handleLogin}
           username={username}
           password={password}
           setUsername={setUsername}
           setPassword={setPassword}
            />
      </Togglable>
        :
        <div>
          <p> {user.username.charAt(0).toUpperCase() + user.username.slice(1)} logged in <button onClick={handleLogout}>logout</button></p>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map(blog =>
            <Blog key={blog.id} blog={blog} setBlogs={setBlogs}/>
          )}
           <Togglable buttonLabel="Click to create a new blog" ref={blogFormRef}>
              <BlogForm onCreate={handleCreateBlog} />
           </Togglable>
        </div>
        
      } 
    </div>
  )
}

export default App