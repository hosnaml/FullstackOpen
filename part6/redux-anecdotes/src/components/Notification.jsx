import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { showNotification } from "../reducers/notificationReducer"

const Notification = ({ message }) => {
    const dispatch = useDispatch()
    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1,
        marginBottom: 10
    }

    useEffect(() => {
        if (!message) return
        dispatch(showNotification(message))
    }, [message, dispatch])
    if (!message) {
        return null
    }
    const error = message === 'error' ? 'error' : 'success'
    return <div style={style} className={error}>{message}</div>
}

export default Notification
