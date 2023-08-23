import { useSelector, useDispatch } from 'react-redux'
import { newVoteAnecdote } from './../reducers/anecdoteReducer'
import { setNoti } from './../reducers/notiReducer'

const AnecdoteList = () => {
  const filter = useSelector(state => state.filter).toLowerCase()
  const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()

  // .filter(anecdote => anecdote.content.toLowerCase().includes(filter))

  const vote = (id) => {
    // console.log('vote', id)
    // dispatch(newVote(id))
    dispatch(newVoteAnecdote(id))
    dispatch(setNoti(`You added a vote to ${(anecdotes.find(anecdote => anecdote.id == id).content)}`, 3000))
    
    // setTimeout(() => {
    //   dispatch(deleteNoti())
    // }, 3000)
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