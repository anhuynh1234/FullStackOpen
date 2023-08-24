import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../requests"

const AnecdoteForm = () => {

  const queryClient = useQueryClient()

  // const newAnecdoteMutation = useMutation({ mutationFn: createAnecdote })
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      // queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
    }
  })

  const getId = () => {
    return Number(100000 * Math.random()).toFixed(0)
  }

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value

    if(!content){
      return
    }

    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({
      content: content,
      id: getId(),
      votes: 0
    })
}

  return (
    <div>
      <h3>Create New</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
