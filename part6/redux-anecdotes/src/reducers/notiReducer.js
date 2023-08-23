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

export default notiSlice.reducer