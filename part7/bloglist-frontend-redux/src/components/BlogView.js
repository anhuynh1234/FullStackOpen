import { addLike } from "../reducers/operationReducer"
import { useDispatch } from "react-redux" 
import Togglable from "./Togglable"
import { useState, useRef } from "react"
import blogService from './../services/blogs'

const BlogView = ({ blog, submitBlog, setSubmitBlog }) => {
    const dispatch = useDispatch()
    const [comment, setComment] = useState('')
    const commentRef = useRef()
    let keyNumber = 0

    if(!blog) {
        return null
    }

    const addComment = async (event) => {
        event.preventDefault()
        commentRef.current.toggle()
        const newBlog = {comments: blog.comments.concat(comment)}
        await blogService.addComment(blog.id, newBlog)  
        setSubmitBlog(!submitBlog)
        setComment('')
    }

    return(
        <div>
            <h1>{blog.title} by {blog.author}</h1>
            <div>
                <a href={`//blog.url`}>{blog.url}</a>
            </div>

            <div>
                {blog.likes} likes
                <button id="like-button" onClick={() => {dispatch(addLike(blog))}}>Like</button>
            </div>
                
            <div>
                Added by {blog.user[0].name}
            </div>

            <h3>Comments</h3>
            
            <div>
                <Togglable buttonLabel="Add Comment" ref={commentRef}>
                    <p>Enter your comment below:</p>
                    <form onSubmit={addComment}>
                        <input
                        className="comment"
                        type="text"
                        value={comment}
                        name="Title"
                        onChange={(target) => {setComment(target.target.value)}}
                        />

                        <button className="comment" type="submit">
                            Submit
                        </button>
                    </form>
                    <p></p>
                </Togglable>
            </div>

            <ul>
                {blog.comments ? (
                    blog.comments.map(comment => { 
                        keyNumber++
                        return (<li key={keyNumber}>{comment}</li>)
                    })
                ) : null}
            </ul>
        </div>
    )
}

export default BlogView