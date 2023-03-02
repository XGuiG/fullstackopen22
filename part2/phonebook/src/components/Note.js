import React from 'react'

const Note = ({ person, handleClick }) => {
  return (
    <div>
      <p>{person.name} {person.number} <button onClick = {handleClick}>delete</button></p>
    </div>
  )
}

export default Note