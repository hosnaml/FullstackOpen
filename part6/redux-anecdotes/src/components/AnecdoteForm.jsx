import React from 'react'

function AnecdoteForm({CreateAnecdote}) {
  return (
    <div>
        <h2>create new</h2>
      <form onSubmit={CreateAnecdote}>
        <div><input
          name="anecdote"
        /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm