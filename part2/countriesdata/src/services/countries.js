import axios from 'axios'

const url = 'https://studies.cs.helsinki.fi/restcountries/api/'

const getCountries = () => {
    return(axios.get(`${url}all`)
                .then(response => response.data))
}

const getCountry = (country)=> {
    return(axios.get(`${url}name/${country}`))
}


export default {getCountries, getCountry}