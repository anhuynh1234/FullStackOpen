import { useDispatch } from 'react-redux'
import { newAnecdote } from './../reducers/anecdoteReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        dispatch(newAnecdote(event.target.anecdote.value))
      }
    
    return (
        <div>
            <h2>Create New</h2>
            <form onSubmit={addAnecdote} >
                <div><input name="anecdote" /></div>
                <button type="submit" >Create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm