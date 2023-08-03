import Toggable from './Togglable'

const Blog = ({blog, user}) => (
  <div style={{border: 'solid', padding: '5px'}}>
    {blog.title} {blog.author}
    <Toggable buttonLabel='View'>
      <div>{blog.url}</div>
      <div>{blog.likes}</div>
      <div>{user.name}</div>
    </Toggable>
  </div>  
)

export default Blog