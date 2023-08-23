import axios from 'axios'
import { getId } from './../reducers/anecdoteReducer'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const addNewAnecdote = async (content) => {
    const anecdoteObject = {
        content: content,
        votes: 0,
        id: getId()
    }

    const response = await axios.post(baseUrl, anecdoteObject)

    return response.data
}

const newVoteAnecdote = async (id) => {
    const anecdotes = await axios.get(baseUrl)
    const anecdote = anecdotes.data.find(anecdote => anecdote.id === id)
    const anecdoteToChange = {...anecdote, votes: anecdote.votes+1}

    const response = await axios.put(`${baseUrl}/${id}`, anecdoteToChange)

    return response.data
}

export default {
    getAll,
    addNewAnecdote,
    newVoteAnecdote
}