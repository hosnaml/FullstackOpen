import { useDispatch } from 'react-redux'
import { voteAnecdoteById } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

function AnecdoteList({filter, anecdotes}) {
  const dispatch = useDispatch()

  const vote = (id) => {
      dispatch(voteAnecdoteById(id))
      const votedAnecdote = anecdotes.find(a => a.id === id)
      dispatch(setNotification(`You voted for anecdote: "${votedAnecdote.content}"`))
  }

  const filteredAnecdotes = anecdotes.filter(anecdote =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h2>Anecdotes</h2>
      {filteredAnecdotes.sort((a, b) => b.votes - a.votes).map(anecdote => (
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList