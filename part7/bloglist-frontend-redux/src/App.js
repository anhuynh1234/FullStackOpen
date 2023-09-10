import { useState, useEffect, useRef } from "react"
import Blogs from "./components/Blogs"
import CreateForm from "./components/CreateForm"
import Toggable from "./components/Togglable"
import BlogView from "./components/BlogView"
import Users from './components/Users'
import User from './components/User'
import Noti from "./components/Noti"
import Login from "./components/Login"
import blogService from "./services/blogs"
import loginService from "./services/login"
import usersService from './services/users'
import { useDispatch, useSelector } from "react-redux"
import { setNoti } from "./reducers/notiReducer"
import { setBlogs } from "./reducers/blogReducer"
import { setUser } from './reducers/userReducer'
import { setUsers } from "./reducers/usersReducer"
import { addLike, deleteBlog, setEmpty } from "./reducers/operationReducer"
import {
  useMatch,
  Routes, Route, Link, Navigate, useNavigate
} from 'react-router-dom'

// const Error = ({ errorMessage }) => {
//   return <div id="error">{errorMessage}</div>
// };

// const Success = ({ successMessage }) => {
//   return <div id="success">{successMessage}</div>
// };

const App = () => {
  const noti = useSelector(state => state.noti)
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const blog = useSelector(state => state.blog)
  const users = useSelector(state => state.users)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userMatch = useMatch('/users/:id')
  const blogMatch = useMatch('/blogs/:id')
  
  const chosenUser = userMatch ? (users ? (users.find(user => String(user.id) === String(userMatch.params.id))) : null) : null
  const chosenBlog = blogMatch ? (blogs ? (blogs.find(blog => String(blog.id) === String(blogMatch.params.id))) : null) : null
  
  // Setting initial states for all variables
  // const [blogs, setBlogs] = useState([]);
  
  const [loginLink, setLoginLink] = useState(null)
  
  // const [user, setUser] = useState(null)
  // const [successMessage, setSuccessMessage] = useState(null)
  // const [errorMessage, setErrorMessage] = useState(null)
  const [submitBlog, setSubmitBlog] = useState(false)
  // const [blog, setBlog] = useState(null)
  // const [deleteBlog, setDeleteBlog] = useState(null)
  
  const blogFormRef = useRef();
  
  // useEffect hooks
  useEffect(() => {
    const getBlogs = async () => {
      if (user !== null) {
        const allBlogs = await blogService.getAll(user)
        allBlogs.sort((a, b) => {
          return a.likes - b.likes
        });
        // setBlogs(allBlogs) //
        dispatch(setBlogs(allBlogs))
      }
    };
    getBlogs();

    if(!user) {
      setLoginLink(<Navigate replace to="/login" />)
    }
  }, [user, submitBlog])
  // console.log(blogs)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
    
    const getUsers = async () => {
      const allUsers = await usersService.getAll()
      dispatch(setUsers(allUsers))
    }
    
    getUsers()

    if(!user) {
      setLoginLink(<Navigate replace to="/login" />)
    }
  }, []);

  useEffect(() => {
    const updateBlog = async () => {
      if (blog[0] === 'addLike') {
        const newBlog = { likes: blog[1].likes + 1 }

        await blogService.update(blog[1].id, newBlog)
        dispatch(setEmpty());
        setSubmitBlog(!submitBlog)
      }
    };
    updateBlog();
  }, [blog]);

  useEffect(() => {
    const deleteBlogs = async () => {
      if (blog[0] === 'deleteBlog') {
        if (
          window.confirm(`Remove ${blog[1].title} by ${blog[1].author}?`)
        ) {
          await blogService.deleteBlog(blog[1].id)
        }
        setSubmitBlog(!submitBlog)
        dispatch(setEmpty());
      }
    };
    deleteBlogs();
  }, [blog]);

  

  // Controls what happens when user logs out
  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedBlogUser")
    dispatch(setUser(null))
    blogService.setToken(null)
    navigate('/login')
  };

  // Controls what hapens when new blogs are added


  // Returns log in page when there is no user info
  // if (user === null) {
  //   // navigate('/login')
  //   return(
  //     <div>
  //       <Login noti={noti} />
  //     </div>
  //   )
  // }

  return (
    <div>
      <h2> Blogs</h2>
      <div>
        {user ? 
          <div>
            <Link to="/users">Users</Link>
            <span> </span>
            <Link to="/blogs">Blogs</Link>

            <form onSubmit={handleLogout}>
              Logged in as {user.name}
              <button id="logout-button" type="submit">
                Log out
              </button>
            </form>
          </div>
          : null
        }
      </div>

      {/* <Error errorMessage={errorMessage} />
      <Success successMessage={successMessage} /> */}
      <Noti noti={noti} />

      <p></p>

      <Routes>
        <Route path="/blogs" element={user ? <Blogs blogs={blogs} user={user} submitBlog={submitBlog} setSubmitBlog={setSubmitBlog}/> : loginLink}/>
        <Route path="/blogs/:id" element={user ? <BlogView blog={chosenBlog} /> : loginLink}/>
        <Route path="/users" element={user ? <Users users={users} /> : loginLink}/>
        <Route path="/users/:id" element={user ? <User user={chosenUser} /> : loginLink}/>
        <Route path="/" element={user ? <Blogs blogs={blogs} user={user} /> : loginLink} />
        <Route path="/login" element={user ? <Navigate replace to="/" /> : <Login noti={noti} /> }/>
      </Routes>

    </div>
  );
};

export default App;
