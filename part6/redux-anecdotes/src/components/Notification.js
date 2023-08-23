import { useSelector } from 'react-redux'

const Notification = () => {
  const noti = useSelector(state => state.noti)
  const displayStyle = noti === '' ? 'none' : ''
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: displayStyle
  }
  return (
    <div style={style}>
      {noti}
    </div>
  )
}

export default Notification