import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./style.css"
import { BrowserRouter as Router } from "react-router-dom"
import notiReducer from './reducers/notiReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from "./reducers/userReducer"
import operationReducer from "./reducers/operationReducer"
import usersReducer from './reducers/usersReducer'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from "react-redux"

const store = configureStore({
    reducer: {
        noti: notiReducer,
        blogs: blogReducer,
        user: userReducer,
        blog: operationReducer,
        users: usersReducer
    }
})

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
);
