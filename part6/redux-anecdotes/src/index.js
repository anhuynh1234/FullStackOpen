import React from 'react'
import ReactDOM from 'react-dom/client'
// import { createStore, combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import App from './App'
import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notiReducer from './reducers/notiReducer'

// const reducer= combineReducers({
//   anecdotes: anecdoteReducer,
//   filter: filterReducer
// })

// const store = createStore(reducer)

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    noti: notiReducer
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)