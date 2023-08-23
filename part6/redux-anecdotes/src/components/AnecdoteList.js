import { useSelector, useDispatch } from 'react-redux'
import { newVote } from './../reducers/anecdoteReducer'
import { createNoti, deleteNoti } from './../reducers/notiReducer'

const AnecdoteList = () => {
  const filter = useSelector(state => state.filter).toLowerCase()
  const anecdotes = useSelector(state => state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter)))
  const dispatch = useDispatch()

  const vote = (id) => {
    // console.log('vote', id)
    dispatch(newVote(id))
    dispatch(createNoti(`You added a vote to ${(anecdotes.find(anecdote => anecdote.id == id).content)}`))
    
    setTimeout(() => {
      dispatch(deleteNoti())
    }, 3000)
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            Has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList