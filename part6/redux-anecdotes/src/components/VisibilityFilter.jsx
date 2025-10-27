import React from 'react'
import { useDispatch } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

function VisibilityFilter() {
    const dispatch = useDispatch()
    
    const handleChange = (event) => {
    // input-field value is in variable event.target.value
    dispatch(filterChange(event.target.value))
    }
    const style = {
        marginBottom: 10
    }
  return (
    <div>
      <h2>Filter anecdotes</h2>
      <input style={style} onChange={handleChange} />
    </div>
  )
}

export default VisibilityFilter