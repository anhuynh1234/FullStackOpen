import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import CreateForm from './components/CreateForm'
import Toggable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const Error = ({errorMessage}) => {
  return (
    <div id='error'>
      {errorMessage}
    </div>
  )
}

const Success = ({successMessage}) => {
  return (
    <div id='success'>
      {successMessage}
    </div>
  )
}

const App = () => {

  // Setting initial states for all variables
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [submitBlog, setSubmitBlog] = useState(false)
  const [blog, setBlog] = useState(null)
  const [deleteBlog, setDeleteBlog] = useState(null)

  // useEffect hooks 
  useEffect(() => {
    const getBlogs = async () => {
      if(user !== null){
        const allBlogs = await blogService.getAll(user)
        allBlogs.sort((a, b) => {return (a.likes - b.likes)})
        setBlogs( allBlogs )
      }
    }  
    getBlogs()
  }, [user, submitBlog])
  // console.log(blogs)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    const updateBLog = async () => {
      if (blog !== null) {
        const newBlog = {likes: blog.likes + 1}
        
        await blogService.update(blog.id, newBlog)
        setBlog(null)
        setSubmitBlog(!submitBlog)
      }
    }
    updateBLog()
  }, [blog])

  useEffect(() => {
    const deleteBlogs = async () => {
      if (deleteBlog !== null) {
        if (window.confirm(`Remove ${deleteBlog.title} by ${deleteBlog.author}?`)){
          await blogService.deleteBlog(deleteBlog.id)
        }
        setSubmitBlog(!submitBlog)
        setDeleteBlog(null)
      }
    }
    deleteBlogs()
  }, [deleteBlog])

  // Handling login page
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

  // Controls what happens when user logs out
  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
    blogService.setToken(null)
  }

  // Controls what hapens when new blogs are added
  const handleCreate = async (event) => {
    event.preventDefault()
    if(title === '' || author === ''){
      return
    }

    try {
      await blogService.create({
        title: title, 
        author: author,
        url: url === '' ? ' ' : url
      })
      setSuccessMessage(`${title} by ${author} has been successfully added`)
      setTimeout(() => {
        setSuccessMessage(``)
      }, 5000)
      setAuthor('')
      setUrl('')
      setTitle('')
      const newSubmitBlog = ! submitBlog
      setSubmitBlog(newSubmitBlog)
    } catch (error) {
      setErrorMessage(error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  // Returns log in page when there is no user info
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
      <Error errorMessage={errorMessage} />
      <Success successMessage={successMessage} />
      <form onSubmit={handleLogout}>
        Logged in as {user.name}
        <button type='submit'>Log out</button>
      </form>
      <p></p>
      <Toggable buttonLabel='Create'>
        <CreateForm 
          title={title} 
          author={author} 
          url={url} 
          setTitle={target => {setTitle(target.target.value)}} 
          setAuthor={target => {setAuthor(target.target.value)}} 
          setUrl={target => {setUrl(target.target.value)}} 
          handleCreate={handleCreate}
        />
      </Toggable>
      <p></p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} incrementLikes={() => setBlog(blog)} deleteBlog={() => setDeleteBlog(blog)} />
      )}
    </div>
  )
}

export default App