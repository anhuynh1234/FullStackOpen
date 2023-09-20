import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { ALL_DATA } from './queries'
import { useQuery } from '@apollo/client'

const App = () => {
  const [page, setPage] = useState('authors')
  const data = useQuery(ALL_DATA, {
    pollInterval: 2000
  })

  if(data.loading) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>Authors</button>
        <button onClick={() => setPage('books')}>Books</button>
        <button onClick={() => setPage('add')}>Add Book</button>
      </div>

      <Authors show={page === 'authors'} authors={data.data.allAuthors} />

      <Books show={page === 'books'} books={data.data.allBooks} />

      <NewBook show={page === 'add'} />
    </div>
  )
}

export default App
