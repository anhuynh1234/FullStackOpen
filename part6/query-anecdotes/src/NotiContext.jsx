import { createContext, useReducer, useContext } from "react"

const notiReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_SUCCESS':
        return `Successfully added ${action.payload.content} to the anecdotes list`
      case 'ADD_LIKE':
        return `Added a like to ${action.payload.content}`
      case 'EMPTY':
        return ''
      case 'ERROR':
        return 'Anecdotes too short, must be longer than 5 characters'
      default:
        return state
    }
  }

const NotiContext = createContext()

export const NotiContextProvider = (props) => {
    const [noti, notiDispatch] = useReducer(notiReducer, '')

    return (
        <NotiContext.Provider value={ [noti, notiDispatch] }>
            {props.children}
        </NotiContext.Provider>
    )
}

export const useNotiValue = () => {
    const notiAndDispatch = useContext(NotiContext)
    return notiAndDispatch[0]
  }
  
  export const useNotiDispatch = () => {
    const notiAndDispatch = useContext(NotiContext)
    return notiAndDispatch[1]
  }

export default NotiContext