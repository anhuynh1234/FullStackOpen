import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async (user) => {
  const request = await axios.get(baseUrl, {
    headers: {
      'Authorization': token
    } 
  })
  // console.log(request)           
  return request.data
}

const create = async newObject => {
  const config = {
    headers: {
      'Authorization': token,
    }
  }
  const response = await axios.post(baseUrl, newObject, config)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}
// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, update, setToken }