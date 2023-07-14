import {useState, useEffect} from 'react'
import countriesServices from './services/countries'

function App() {
  const [findCountry, setFindCountry] = useState('')
  const [countries, setCountries] = useState(null)
  const [countriesList, setCountriesList] = useState([])

  const handleInputChange = (event) => {
    setFindCountry(event.target.value)
  }

  useEffect(() => {
    countriesServices.getCountries()
                     .then(response => {
                            setCountries(response)
                          })
  },[])

  if(!countries){
    return null
  }

  if(findCountry != ''){
    
  }

  return (
    <div>
      <span>Find the countries: </span>
      <input value={findCountry} onChange={handleInputChange} />
    </div>
  );
}

export default App;
