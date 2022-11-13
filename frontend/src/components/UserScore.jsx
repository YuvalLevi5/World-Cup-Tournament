import React, { useState } from 'react'

const UserScore = ({ user, updateScore }) => {
    const [scoreToAdd, setscoreToAdd] = useState()
    const [reasonToAdd, setreasonToAdd] = useState('')
    const handleChange = (event, index) => {
        const value = +event.target.value
        setscoreToAdd(value)
    }

    const hangleAddScore = () => {
        const copyUser = JSON.parse(JSON.stringify(user))
        if (typeof scoreToAdd === 'number') {
            copyUser[reasonToAdd] += scoreToAdd
            copyUser.score += scoreToAdd
            updateScore(copyUser)
        }
    }

    const handleSelectChange = (event) => {
        const value = event.target.value
        setreasonToAdd(value)
    }

    return (
        <div className='score-zone'>
            <h5>Username: {user.username}</h5>
            <h5>Current Score: {user.score}</h5>
            <input className='score-input' onChange={(e) => handleChange(e)} type="number" />
            <select id="reason" name="reason" onChange={(e) => handleSelectChange(e)}>
                <option value="">Choose</option>
                <option value="gsc">Group Stage Score</option>
                <option value="wcw">WC Winner Score</option>
                <option value="ts">Top Scorer Score</option>
            </select>
            <button onClick={hangleAddScore} className='btn succes' >Add Points</button>
        </div>
    )
}

export default UserScore