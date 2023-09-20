import { useState } from "react"
import { EDIT_AUTHOR } from "../queries"
import { useMutation } from '@apollo/client'

const Authors = (props) => {
  const authors = props.authors
  const [author, setAuthor] = useState('')
  const [birthyear, setBirthYear] = useState('')
  const [editBirthyear] = useMutation(EDIT_AUTHOR)

  if (!props.show) {
    return null
  }

  const changeYear = (event) => {
    event.preventDefault()

    editBirthyear({
      variables: {
        name: author,
        setBornTo: parseInt(birthyear)
      }
    })

    setAuthor('')
    setBirthYear('')
  }

  return (
    <div>
      <h2>Authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Born</th>
            <th>Books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Set Birthyear</h2>
      <form onSubmit={changeYear}>
        {/* <div>
          Name
          <input type="text" value={author} onChange={({ target }) => setAuthor(target.value)} />
        </div> */}

        <select name="authors" value={author} onChange={(e) => setAuthor(e.target.value)}>
          {authors.map(author => 
            <option value={author.name} key={author.name}>{author.name}</option>
          )}
        </select>          

        <div>
          Birthyear
          <input type="number" value={birthyear} onChange={({ target }) => setBirthYear(target.value)} />
        </div>

        <button type="submit">Change</button>
      </form>
    </div>
  )
}

export default Authors
