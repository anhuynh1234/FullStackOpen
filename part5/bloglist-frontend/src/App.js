import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const Error = ({errorMessage}) => {

}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin =async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({username, password,})
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeOut(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  if(user === null){
    return (
      <div>
        <h2>Blogs</h2>

        <form onSubmit={handleLogin}>
          <div>
            Username  
              <input type="text" value={username} name="Username" onChange={target => {setUsername(target.target.value)}} />
          </div> 
          <div>
            Password    
              <input type='password' value={password} name="Password" onChange={target => {setPassword(target.target.value)}} />
          </div>
          <button type='submit'>Log in</button>
        </form>
      </div>
    )
  }

  return (
   <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App