import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from './../services/anecdotes'

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

export const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

// const initialState = anecdotesAtStart.map(asObject)

// const reducer = (state = initialState, action) => {
//   // console.log('state now: ', state)
//   // console.log('action', action)
//   switch(action.type) {
//     case 'VOTE':
//       const anecdoteToChange = state.find(anectdote => anectdote.id === action.payload.id)
//       const newAnecdote = {...anecdoteToChange, votes: anecdoteToChange.votes+1}
//       return state.map(anecdote => anecdote.id === action.payload.id ? newAnecdote : anecdote)
//     case 'ADD':
//       return state.concat(action.payload)
//     default:
//       return state
//   }
//   // return state
// }

// export const newAnecdote = (content) => {
//   if(!content) {
//     return
//   }
//   return {
//     type: 'ADD',
//     payload: {
//       id: getId(),
//       content: content,
//       votes: 0
//     }
//   }
// }

// export const newVote = (id) => {
//   return {
//     type: 'VOTE',
//     payload: {
//       id: id
//     }
//   }
// }

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    // newAnecdote(state, action) {
    //   // const newEntry = {
    //   //   id: getId(),
    //   //   content: action.payload,
    //   //   votes: 0
    //   // }
    //   state.push(action.payload)
    // },
    newVote(state, action) {
      const id = action.payload
      const newState = state.map(anecdote => anecdote.id !== id ? anecdote : {...anecdote, votes: anecdote.votes+1})
      return newState
    },
    setAnecdote(state, action) {
      return action.payload
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    }
  }
})

export const { newVote, setAnecdote, appendAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdote(anecdotes))
  }
}

export const newAnecdote = (content) => {
  return async dispatch => {
    const newAnecdoteEntry = await anecdoteService.addNewAnecdote(content)
    dispatch(appendAnecdote(newAnecdoteEntry))
  }
}

export const newVoteAnecdote = (id) => {
  return async dispatch => {
    await anecdoteService.newVoteAnecdote(id)
    dispatch(newVote(id))
  }
}

export default anecdoteSlice.reducer