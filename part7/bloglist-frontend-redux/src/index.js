import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./style.css"
import notiReducer from './reducers/notiReducer'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from "react-redux"

const store = configureStore({
    reducer: {
        noti: notiReducer
    }
})

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <App />
    </Provider>
    );
