import React from 'react'
import { useState } from 'react'

function BlogForm({ onCreate }) {

  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })

  function handleBlogSubmit(event) {
    event.preventDefault()
    const success = onCreate(newBlog)
    if (success) {
      setNewBlog({
        title: '',
        author: '',
        url: ''
      })
    }
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setNewBlog({ ...newBlog, [name.toLowerCase()]: value })
  }



  return (
    <div>
      <h3>Create new</h3>
      <form onSubmit={handleBlogSubmit}>
        <div>
                title:
          <input
            type="text"
            value={newBlog.title}
            name="Title"
            onChange={handleInputChange}
          />
        </div>
        <div>
                author:
          <input
            type="text"
            value={newBlog.author}
            name="Author"
            onChange={handleInputChange}
          />
        </div>
        <div>
                url:
          <input
            type="text"
            value={newBlog.url}
            name="URL"
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">create</button>
      </form>

    </div>

  )
}

export default BlogForm