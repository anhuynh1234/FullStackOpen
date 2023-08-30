// import { useContext } from "react"
// import NotiContext from "../NotiContext"
import { useNotiValue } from "../NotiContext"

const Notification = () => {
  const noti = useNotiValue()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={noti === '' ? null : style}>
      {noti}
    </div>
  )
}

export default Notification
