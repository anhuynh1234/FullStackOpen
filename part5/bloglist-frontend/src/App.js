import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const Error = ({errorMessage}) => {
  return (
    <div id='error'>
      {errorMessage}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    const getBlogs = async () => {
      if(user !== null){
        const allBlogs = await blogService.getAll(user)
          setBlogs( allBlogs )
      }
    }  
    getBlogs()
  }, [user])
  console.log(blogs)

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({username, password,})
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  if(user === null){
    return (
      <div>
        <Error errorMessage={errorMessage} />
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
      <form>
        Logged in as {user.name}
        <button type='submit'>Log out</button>
      </form>
      <p></p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App