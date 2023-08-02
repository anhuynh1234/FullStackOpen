import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

const getAll = async (user) => {
  const request = await axios.get(baseUrl, {
    headers: {
      'Authorization': `Bearer ${user.token}`
    } 
  })
  // console.log(request)           
  return request.data
}
// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll }