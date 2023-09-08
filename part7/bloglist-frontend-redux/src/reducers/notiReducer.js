
const notiReducer = (state = [], action) => {
    switch (action.type) {
        case 'SUCCESS': 
            return ['success', `${action.payload.content.title} by ${action.payload.content.author} has been successfully added`]
        case 'ERROR':
            if(action.payload.type === 'loginError') {
                return ['error', `Wrong credentials`]
            }else if(action.payload.type === 'createError') {
                return ['error', action.payload.content]
            }
        default:
            return state
    }
}

export default notiReducer