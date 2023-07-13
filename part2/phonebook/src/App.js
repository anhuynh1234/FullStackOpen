import { useState, useEffect} from 'react'
import axios from 'axios'

const Filter = function ({filter, handleFilterChange}) {
  return(
    <>
      Filter name with: <input value={filter} onChange={handleFilterChange} />
    </>
  )
}

const Form = ({newName, newNumber, handleSubmitName, handleChangeInput, handleChangeInputNumber}) => {
  return(
    <>
      <form onSubmit={handleSubmitName}> 
        <div>
          Name: <input value={newName} onChange={handleChangeInput} />
        </div>
        <div>
          Number: <input value={newNumber} onChange={handleChangeInputNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

const Numbers = function ({persons, filter}) {
  return(
    <div>
      {persons.map(person => {
        if((person.name.toLowerCase()).includes(filter.toLowerCase())){
          return (<p key={person.id}>{person.name}: {person.number}</p>)
        }
      })}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then(promise => {
      setPersons(promise.data)
    })
  }, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState('')
  const [filter, setFilter] = useState('')

  const handleSubmitName = (event) => {
    event.preventDefault()
    let repeated = false
    persons.map(person => newName === person.name ? repeated = true : (repeated ? repeated = true : repeated = false))

    if(repeated){
      window.alert(`${newName} is in the phonebook already!`)
    }else if(newName !== ""){
      setPersons(persons.concat({name: newName, number: newNumber, id: persons.length+1}))
    }
    setNewName('')
    setNumber('')
  }

  const handleChangeInput = (event) => {
    setNewName(event.target.value)
  }

  const handleChangeInputNumber = (event) => {
    setNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <Filter filter={filter} handleFilterChange={handleFilterChange} />
      </div>
      <h2>Add a new</h2>
      <Form newName={newName} newNumbe={newNumber} handleSubmitName={handleSubmitName} handleChangeInput={handleChangeInput} handleChangeInputNumber={handleChangeInputNumber} />
      <h2>Numbers</h2>
      <Numbers persons={persons} filter={filter} />
    </div>
  )
}

export default App