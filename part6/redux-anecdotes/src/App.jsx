
import { useSelector, useDispatch } from 'react-redux'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import VisibilityFilter from './components/VisibilityFilter'
import { voteAnecdote, createAnectdote } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const filteredAnecdotes = anecdotes.filter(anecdote =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase())
  )


  const vote = (id) => {
    dispatch(voteAnecdote(id))
  }


  const CreateAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnectdote(content))
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