import { useState } from 'react'
import blogService from '../services/blogs'


const Blog = ({ blog, setBlogs }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const handleLikes = async () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    await blogService.update(blog.id, { likes: blog.likes + 1 })
    setBlogs((prevBlogs) =>
      prevBlogs.map((b) => (b.id === blog.id ? updatedBlog : b))
    )
  }

  const handleRemove = async () => {
    if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`)) {
      await blogService.remove(blog.id)
      setBlogs((prevBlogs) => prevBlogs.filter((b) => b.id !== blog.id))
    }
  }

  return (
    <div className="blog">
      <div>
        {blog.title}
        <button className="blogButton" style={hideWhenVisible} onClick={() => setVisible(true)}>view</button>
        <button className="blogButton" style={showWhenVisible} onClick={() => setVisible(false)}>hide</button>
      </div>
      <div className="blog-details" style={showWhenVisible}>
        <p>{blog.url}</p>
        <p>
          likes {blog.likes}
          <button className="blogButton" onClick={handleLikes}>like</button>
        </p>
        <p>{blog.author}</p>
        <button className="blogButton" onClick={handleRemove}>remove</button>
      </div>
    </div>
  )
}

export default Blog