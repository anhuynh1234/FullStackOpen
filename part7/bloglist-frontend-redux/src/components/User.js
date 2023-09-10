

const User = (user) => {

    if(!user.user) {
        return null
    }

    return(
        <div>
            <h2>{user.user.name}</h2>
            <h3>Added Blogs</h3>
            <ul>
                {user.user.blogs ? (user.user.blogs.map(blog => (
                    <li key={blog.id}>{blog.title}</li>
                ))) : null}
            </ul>
        </div>
    )
}

export default User