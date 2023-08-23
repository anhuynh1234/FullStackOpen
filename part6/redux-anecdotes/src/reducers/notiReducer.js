import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notiSlice = createSlice({
    name: 'noti',
    initialState,
    reducers: {
        createNoti(state, action) {
            return action.payload
        },
        deleteNoti(state, action) {
            return ''
        }
    }
})

export const { createNoti, deleteNoti } = notiSlice.actions

export const setNoti = (content, time) => {
    return dispatch => {
        dispatch(createNoti(content))
        setTimeout(() => {
            dispatch(deleteNoti())
          }, time)
    }
}

export default notiSlice.reducer