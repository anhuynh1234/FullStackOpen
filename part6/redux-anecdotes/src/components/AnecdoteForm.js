import { useDispatch } from 'react-redux'
import { newAnecdote } from './../reducers/anecdoteReducer'
import { filterChange } from './../reducers/filterReducer'
import { createNoti, deleteNoti } from './../reducers/notiReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        dispatch(newAnecdote(event.target.anecdote.value))
        dispatch(filterChange(''))
        dispatch(createNoti(`You added an anecdote ${event.target.anecdote.value}`))
    
        setTimeout(() => {
        dispatch(deleteNoti())
        }, 3000)
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