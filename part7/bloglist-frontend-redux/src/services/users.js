import axios from "axios";
const baseUrl = '/api/users'

const getAll = async () => {
    return await axios.get(baseUrl).then(response => response.data)
}

export default { getAll } 