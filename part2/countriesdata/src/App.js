import {useState, useEffect} from 'react'
import countriesServices from './services/countries'


const Countries = ({countries, findCountry, country}) => {
  if(!countries || findCountry === ''){
    return null
  }

  if(countries.length > 10){
    return(
      <div>
        Too many results, please be more specific
      </div>
    )
  }else if(countries.length === 1 && country !== null){
    console.log(country.flags.png)
    return(
      <div>
        <h1>{country.name.common}</h1>
        <span></span>
        <span></span>
        <div>Capital: {country.capital}</div>
         <div>Area: {country.area}</div>
        <h3>Languages</h3>
        <ul>
          {Object.values(country.languages).map(language => (
              <li>{language}</li>
          ))}
        </ul>
        <img src={`${(country.flags.png)}`} />
      </div>
    )
  }
  
}




function App() {
  const [findCountry, setFindCountry] = useState('')
  const [countries, setCountries] = useState(null)
  const [country, setCountry] = useState(null)
  const [countriesList, setCountriesList] = useState(null)


  const handleInputChange = (event) => {
    setFindCountry(event.target.value)
    setCountry(null)
    setCountriesList(countries.filter(country => country.common.toLowerCase().includes(findCountry.toLowerCase())))
    if(countriesList){
      if(countriesList.length === 1){
        countriesServices.getCountry(countriesList[0].common.toLowerCase())
                          .then(response => {
                            setCountry(response.data)
                          })
                          .catch(error => null)
      }
    }
  }


  useEffect(() => {
    countriesServices.getCountries()
                     .then(response => {
                            setCountries(response.map(country => country.name))
                          })
  },[])

  if(!countries){
    return null
  }


  

  // setCountriesList(countries.filter(country => {
  //   if(country.common.toLowerCase() === findCountry.toLowerCase()){
  //     return country
  //   }
  // }))

  return (
    <div>
      <span>Find the countries: </span>
      <input value={findCountry} onChange={handleInputChange} />
      <Countries countries={countriesList} findCountry={findCountry} country={country}/>
    </div>
  );
}

export default App;
