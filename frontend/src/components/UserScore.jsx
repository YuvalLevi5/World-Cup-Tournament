import React, { useState } from 'react'

const UserScore = ({ user, updateScore }) => {
    const [scoreToAdd, setscoreToAdd] = useState()
    const handleChange = (event, index) => {
        const value = +event.target.value
        setscoreToAdd(value)
    }

    const hangleAddScore = () => {
        const copyUser = JSON.parse(JSON.stringify(user))
        if (typeof scoreToAdd === 'number') {
            copyUser.score += scoreToAdd
            updateScore(copyUser)
        }
    }

    return (
        <div className='score-zone'>
            <h5>Username: {user.username}</h5>
            <h5>Current Score: {user.score}</h5>
            <input className='score-input' onChange={(e) => handleChange(e)} type="number" />
            <button onClick={hangleAddScore} className='btn succes' >Add Score</button>
        </div>
    )
}

export default UserScore