import { createSlice} from "@reduxjs/toolkit";

const blogSubmitSlice = createSlice({
    name: 'blogSubmit',
    initialState: false,
    reducers: {
        toggleBlogSubmit(state, action) {
            return !state
        }
    }
})

export default blogSubmitSlice.reducer

export const { toggleBlogSubmit } = blogSubmitSlice.actions