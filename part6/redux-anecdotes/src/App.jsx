import { useSelector, useDispatch } from 'react-redux'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import VisibilityFilter from './components/VisibilityFilter'

const App = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const filteredAnecdotes = anecdotes.filter(anecdote =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase())
  )

  const vote = (id) => {
    dispatch({type: 'VOTE', id})
  }

  const CreateAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch({
      type: 'NEW_ANECDOTE',
      data: { content }
    })
  }

  return (
    <div>
      <VisibilityFilter />
      <AnecdoteList anecdotes={filteredAnecdotes} vote={vote} />
      <AnecdoteForm CreateAnecdote={CreateAnecdote} />
    </div>
  )
}

export default App