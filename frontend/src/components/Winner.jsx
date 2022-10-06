import React from 'react'

const Winner = ({currentUser}) => {

    const handleChange = (event) => {
console.log(event)
        // game[tagertName] = +event.target.value
    }

    return (
        <div>
            <h5>Enter your winner: </h5>
            <input onChange={(e) => handleChange(e)} type="text" placeholder='World Cup Winner' value={currentUser?.winner ? currentUser?.winner : ''} />
        </div>
    )
}

export default Winner