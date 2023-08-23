import { createSlice } from '@reduxjs/toolkit'

// const reducer = (state = '', action) => {
//     switch(action.type) {
//         case 'FILTER':
//             const newState = action.payload.content
//             return newState
//         default:
//             return state
//     }
// }

// export const filterChange = (content) => {
//     return {
//         type: 'FILTER',
//         payload: {
//             content: content
//         }
//     }
// }

const initialState = ''

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        filterChange(state, action) {
            const content = action.payload
            state = content
            return state
        }
    }
})

export const { filterChange } = filterSlice.actions

export default filterSlice.reducer