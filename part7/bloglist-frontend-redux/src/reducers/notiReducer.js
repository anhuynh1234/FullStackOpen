import { createSlice } from "@reduxjs/toolkit"

// const notiReducer = (state = [], action) => {
//     switch (action.type) {
//         case 'SUCCESS': 
//             return ['success', `${action.payload.content.title} by ${action.payload.content.author} has been successfully added`]
//         case 'ERROR':
//             if(action.payload.type === 'loginError') {
//                 return ['error', `Wrong credentials`]
//             }else if(action.payload.type === 'createError') {
//                 return ['error', action.payload.content]
//             }
//         default:
//             return state
//     }
// }

const notiSlice = createSlice({
    name: 'noti',
    initialState: [],
    reducers: {
        setNoti(state, action) {
            switch (action.payload.type) {
                case 'SUCCESS': 
                    return ['success', `${action.payload.title} by ${action.payload.author} has been successfully added`]
                case 'ERROR':
                    if(action.payload.error === 'loginError') {
                        return ['error', `Wrong credentials`]
                    }else if(action.payload.error === 'createError') {
                        return ['error', action.payload.content]
                    }
                case 'EMPTY':
                    return []
                default:
                    return state
            }
        }
    }
})

export const { setNoti } = notiSlice.actions

export default notiSlice.reducer