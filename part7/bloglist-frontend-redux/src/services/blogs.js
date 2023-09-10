import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async (user) => {
  const request = await axios.get(baseUrl, {
    headers: {
      Authorization: token,
    },
  });
  // console.log(request)
  return request.data;
};

const create = async (newObject) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const response = await axios.post(baseUrl, newObject, config);
};

const update = async (id, newObject) => {
  // const request =
  const response = await axios.put(`${baseUrl}/${id}`, newObject, {
    headers: {
      Authorization: token,
    },
  });
  // return request.then(response => response.data)
};

const deleteBlog = async (id) => {
  await axios.delete(`${baseUrl}/${id}`, {
    headers: {
      Authorization: token,
    },
  });
};

const addComment = async (id, newObject) => {
  await axios.put(`${baseUrl}/${id}/comments`, newObject , {
    headers: {
      Authorization: token,
    }
  })
}

export default { getAll, create, update, deleteBlog, setToken, addComment };
