import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Noti from "./Noti";
import { setNoti } from "../reducers/notiReducer";
import { setUser } from "../reducers/userReducer";
import loginService from './../services/login'
import blogService from './../services/blogs'
import { useDispatch, useSelector } from "react-redux";

// Handling login page
const Login = ({ noti }) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")  
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const handleLogin = async (event) => {
        event.preventDefault();
    
        try {
          const user = await loginService.login({ username, password });
    
          window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));
          blogService.setToken(user.token);
    
          dispatch(setUser(user))
    
          setUsername("");
          setPassword("");
        } catch (exception) {
          // setErrorMessage("Wrong credentials");
          // setTimeout(() => {
          //   setErrorMessage(null);
          // }, 5000);
          dispatch(setNoti({
            type: 'ERROR',
            error: 'loginError'
          }))
    
          setTimeout(() => {
            dispatch(setNoti({
              type: 'EMPTY'
            }))
          }, 3000)
        }
        navigate('/')
    };

    return (
        <div>
            <Noti noti={noti} />

            <form onSubmit={handleLogin}>
            <div>
                Username
                <input
                id="username"
                type="text"
                value={username}
                name="Username"
                onChange={(target) => {
                    setUsername(target.target.value)
                }}
                />
            </div>
            <div>
                Password
                <input
                id="password"
                type="password"
                value={password}
                name="Password"
                onChange={(target) => {
                    setPassword(target.target.value)
                }}
                />
            </div>
            <button id="login-button" type="submit">
                Log in
            </button>
            </form>
        </div>
    )
}

export default Login