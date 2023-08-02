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
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
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
  // console.log(blogs)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({username, password,})

      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
        )
      blogService.setToken(user.token)
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

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
    blogService.setToken(null)
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

  const handleCreate = async (event) => {
    event.preventDefault()
    blogService.create({
      title: title, 
      author: author,
      url: url
    })
  }

  return (
   <div>
      <form onSubmit={handleLogout}>
        Logged in as {user.name}
        <button type='submit'>Log out</button>
      </form>
      <p></p>
      <form onSubmit={handleCreate}>
        <div>
          Title:
            <input type='text' value={title} name='Title' onChange={target => {setTitle(target.target.value)}} />
        </div>
        <div>
          Author:
            <input type='text' value={author} name='Author' onChange={target=> {setAuthor(target.target.value)}} />
        </div>
        <div>
          Url:
            <input type='text' value={url} name='Url' onChange={target => {setUrl(target.target.value)}} />
        </div>
        <button type='submit'>Create</button>
      </form>
      <p></p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App