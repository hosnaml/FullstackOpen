
import { useSelector, useDispatch } from 'react-redux'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import VisibilityFilter from './components/VisibilityFilter'
import Notification from './components/Notification'
import { voteAnecdote, createAnectdote } from './reducers/anecdoteReducer'
import { setNotification, clearNotification } from './reducers/notificationReducer'

const App = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()

  const filteredAnecdotes = anecdotes.filter(anecdote =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase())
  )


  const vote = (id) => {
    dispatch(voteAnecdote(id))
    const votedAnecdote = anecdotes.find(a => a.id === id)
    dispatch(setNotification(`You voted for anecdote: "${votedAnecdote.content}"`))
  }


  const CreateAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnectdote(content))
    dispatch(setNotification(`You created a new anecdote: "${content}"`))
  }

  return (
    <div>
      <Notification message={notification} />
      <VisibilityFilter />
      <AnecdoteList anecdotes={filteredAnecdotes} vote={vote} />
      <AnecdoteForm CreateAnecdote={CreateAnecdote} />
    </div>
  )
}

export default App