const Notification = ({ message, setMessage }) => {
  if (message === null) {
    return null
  }
  setTimeout(() => {
    setMessage(null)
  }, 5000)

  const className = message.type === 'error' ? 'error' : 'success'

  return <div className={className}>{message.text}</div>
}

export default Notification
