import { useDispatch } from 'react-redux'
import { newAnecdote } from './../reducers/anecdoteReducer'
import { filterChange } from './../reducers/filterReducer'
import { setNoti } from './../reducers/notiReducer'
// import anecdoteService from './../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()

        if(!event.target.anecdote.value) {
            return
        }

        // const newAnecdoteEntry = await anecdoteService.addNewAnecdote(event.target.anecdote.value)
        
        // dispatch(newAnecdote(newAnecdoteEntry))
        dispatch(newAnecdote(event.target.anecdote.value))
        dispatch(filterChange(''))
        dispatch(setNoti(`You added an anecdote ${event.target.anecdote.value}`, 3000))
        event.target.anecdote.value = ''
    
        // setTimeout(() => {
        // dispatch(deleteNoti())
        // }, 3000)
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