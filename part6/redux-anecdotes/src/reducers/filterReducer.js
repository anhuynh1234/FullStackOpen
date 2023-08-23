const reducer = (state = '', action) => {
    switch(action.type) {
        case 'FILTER':
            const newState = action.payload.content
            return newState
        default:
            return state
    }
}

export const filterChange = (content) => {
    return {
        type: 'FILTER',
        payload: {
            content: content
        }
    }
}

export default reducer