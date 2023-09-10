import { addLike } from "../reducers/operationReducer"
import { useDispatch } from "react-redux" 

const BlogView = ({ blog }) => {
    const dispatch = useDispatch()

    if(!blog) {
        return null
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
        </div>
    )
}

export default BlogView