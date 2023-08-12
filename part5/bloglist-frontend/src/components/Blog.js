import Toggable from './Togglable'

const Blog = ({ blog, user, incrementLikes, deleteBlog }) => (
  <div style={{ border: 'solid', padding: '5px' }} className='blog'>
    <span>{blog.title} </span>
    <span>{blog.author}</span>
    <Toggable buttonLabel='View'>
      <div>{blog.url}</div>
      <div>
        {blog.likes}
        <button onClick={incrementLikes}>Like</button>
      </div>
      <div>{user.name}</div>
      <div>
        <button onClick={deleteBlog} >Delete</button>
      </div>
    </Toggable>
  </div>
)

export default Blog