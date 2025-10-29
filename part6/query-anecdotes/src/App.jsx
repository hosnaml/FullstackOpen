import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import AnecdoteService from './services/anecdotes'

const App = () => {

  const queryClient = useQueryClient()
  const voteMutation = useMutation({
    mutationFn: ({ id, votes }) => AnecdoteService.updateVotes(id, votes + 1),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })

  const handleVote = (anecdote) => {
    voteMutation.mutate({ id: anecdote.id, votes: anecdote.votes })
  }

  const { data: anecdotes, isLoading, error } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: AnecdoteService.getAll,
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      <h3>Anecdote app</h3>

      {/* <Notification /> */}
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            {`has ${anecdote.votes}`}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
