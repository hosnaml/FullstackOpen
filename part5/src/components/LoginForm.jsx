import React, { useState } from 'react'

export default function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleLogin = async (event) => {
    event.preventDefault()
    
    await onLogin({ username, password })
    
    setUsername('')
    setPassword('')
  }

  return (
    <div><h2>Login</h2><form onSubmit={handleLogin}>
          <div>
              <label>
                  username
                  <input
                      type="text"
                      value={username}
                      onChange={({ target }) => setUsername(target.value)} />
              </label>
          </div>
          <div>
              <label>
                  password
                  <input
                      type="password"
                      value={password}
                      onChange={({ target }) => setPassword(target.value)} />
              </label>
          </div>
          <button type="submit">login</button>
      </form></div>

  )
}

