import { useMutation, useQueryClient } from '@tanstack/react-query'
import AnecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {

  const queryClient = useQueryClient()

  const newNoteMutation = useMutation({
    mutationFn: AnecdoteService.createNew,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newNoteMutation.mutate(content)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
