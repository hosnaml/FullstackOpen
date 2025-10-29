
import { useSelector, useDispatch } from 'react-redux'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import VisibilityFilter from './components/VisibilityFilter'
import Notification from './components/Notification'
import {initializeAnecdotes} from './reducers/anecdoteReducer'
import { useEffect } from 'react'

const App = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])

  return (
    <div>
      <Notification message={notification} />
      <VisibilityFilter />
      <AnecdoteList filter={filter} anecdotes={anecdotes} />
      <AnecdoteForm />
    </div>
  )
}

export default App