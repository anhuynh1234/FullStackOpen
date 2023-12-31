import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import { useContext } from 'react'
import NotiContext from './NotiContext'

const App = () => {

  const [noti, notiDispatch] = useContext(NotiContext)

  const queryClient = useQueryClient()

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    // }
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.map(anecdote => anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote))
    }
  })

  const handleVote = (anecdote) => {
    const updatedAnecdote = {...anecdote, votes: anecdote.votes+1}
    updateAnecdoteMutation.mutate(updatedAnecdote)

    notiDispatch({
      type: 'ADD_LIKE',
      payload: {
        content: anecdote.content
      }
    })

    setTimeout(() => {
      notiDispatch({
        type: 'EMPTY'
      })
    }, 3000)
  }

  // const anecdotes = [
  //   {
  //     "content": "If it hurts, do it more often",
  //     "id": "47145",
  //     "votes": 0
  //   },
  // ]

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false, // or 1
    refetchOnWindowFocus: false
  })

  if(result.isLoading) {
    return(
      <div>
        Loading Anecdotes...
      </div>
    )
  }

  if(!result.isSuccess) {
    return(
      <div>
        Error in fetching anecdotes due to problems in the server!!
      </div>
    )
  }

  const anecdotes = result.data

  return (
    // <NotiContext.Provider value={[noti, notiDispatch]}> 
    <div>
      <h3>Anecdote App</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            Has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>Vote</button>
          </div>
        </div>
      )}
    {/* </NotiContext.Provider> */}
    </div>
  )
}

export default App
