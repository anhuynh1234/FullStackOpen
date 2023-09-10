import { createSlice} from "@reduxjs/toolkit";

const opreationSlice = createSlice({
    name: 'operation',
    initialState: [],
    reducers: {
        addLike(state, action) {
            return ['addLike', action.payload]
        },
        deleteBlog(state, action) {
            return ['deleteBlog', action.payload]
        },
        setEmpty(state, action) {
            return []
        }
    }
})

export default opreationSlice.reducer

export const { addLike, deleteBlog, setEmpty } = opreationSlice.actions