import Blog from "./Blog";
import { addLike, deleteBlog } from "../reducers/operationReducer";
import { useDispatch } from "react-redux";
import Toggable from "./Togglable";
import CreateForm from "./CreateForm";
import { setNoti } from "../reducers/notiReducer";
import { useState, useEffect, useRef } from "react"
import blogService from './../services/blogs'

const Blogs = ({ blogs, user, submitBlog, setSubmitBlog }) => {
    const dispatch = useDispatch()
    const blogFormRef = useRef()

    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [url, setUrl] = useState("")

    const handleCreate = async (event) => {
        event.preventDefault();
        blogFormRef.current.toggle();
        if (title === "" || author === "") {
          return;
        }
    
        try {
          await blogService.create({
            title: title,
            author: author,
            url: url === "" ? " " : url,
          });
          // setSuccessMessage(`${title} by ${author} has been successfully added`);
          // setTimeout(() => {
          //   setSuccessMessage("");
          // }, 5000);
          dispatch(setNoti({
            type: 'SUCCESS',
            title: title,
            author: author
          }))
    
          setTimeout(() => {
            dispatch(setNoti({
              type: 'EMPTY'
            }))
          }, 3000)
    
          setAuthor("");
          setUrl("");
          setTitle("")
    
          const newSubmitBlog = !submitBlog;
          setSubmitBlog(newSubmitBlog);
        } catch (error) {
          // setErrorMessage(error);
          // setTimeout(() => {
          //   setErrorMessage(null);
          // }, 5000);
          dispatch(setNoti({
            type: 'ERROR',
            error: 'createError',
            content: error
          }))
    
          setTimeout(() => {
            dispatch(setNoti({
              type: 'EMPTY'
            }))
          }, 3000)
        }
      };

    return(
        <div>
            <Toggable buttonLabel="Create" ref={blogFormRef}>
                <CreateForm
                title={title}
                author={author}
                url={url}
                setTitle={(target) => {
                    setTitle(target.target.value);
                }}
                setAuthor={(target) => {
                    setAuthor(target.target.value);
                }}
                setUrl={(target) => {
                    setUrl(target.target.value);
                }}
                handleCreate={handleCreate}
                />
            </Toggable>

            <p></p>

            {blogs.map((blog) => (
                
                <Blog
                key={blog.id}
                blog={blog}
                user={user}
                incrementLikes={() => dispatch(addLike(blog))}
                deleteBlog={() => dispatch(deleteBlog(blog))}
                />

            ))}
        </div>
    )
}

export default Blogs