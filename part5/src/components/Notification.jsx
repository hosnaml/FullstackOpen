const Notification = ({ message, setMessage }) => {
  if (message === null) {
    return null
  }
  setTimeout(() => {
    setMessage(null)
  }, 5000)

  const error= message.type === 'error' ? 'error' : 'success'

  return <div className={error}>{message.text}</div>
}

export default Notification
