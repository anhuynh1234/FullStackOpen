import Toggable from "./Togglable";
import { Link } from "react-router-dom";

const Blog = ({ blog, user, incrementLikes, deleteBlog }) => (
  <div style={{ border: "solid", padding: "5px" }} className="blog">

    <Link to={`/blogs/${blog.id}`} key={blog.id}>
      <span id={blog.title}>{blog.title} </span>
      <span>{blog.author}</span>
    </Link>

    <Toggable buttonLabel="View">
      <div>{blog.url}</div>
      <div>
        <span id="likes">{blog.likes}</span>
        <button id="like-button" onClick={incrementLikes}>
          Like
        </button>
      </div>
      <div>{blog.user[0].name}</div>
      {/* {console.log(blog.user[0])}
      {console.log(user)} */}
      <div>
        {blog.user[0].username === user.username ? (
          <button id="delete-button" onClick={deleteBlog}>
            Delete
          </button>
        ) : null}
        {/* <button id='delete-button' onClick={deleteBlog} >Delete</button> */}
      </div>
    </Toggable>
  </div>
);

export default Blog;
