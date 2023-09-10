import { Link } from "react-router-dom"

const Users = ({ users }) => {
    
    return(
        <div>
            <h2>Users</h2>
            <table>
                <tbody>
                    <tr>
                        <td>Users</td>
                        <td>Blogs created</td>
                    </tr>        
                    {users ? users.map(user => {
                        return (
                            <tr key={user.id}>
                                <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                                <td>{user.blogs.length}</td>
                            </tr>
                        )
                    }) : null}
                </tbody>
            </table>
        </div>
    )
}

export default Users