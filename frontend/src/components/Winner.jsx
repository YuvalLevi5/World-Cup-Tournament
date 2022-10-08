import React, { useState } from 'react'
import { useEffect } from 'react'

const Winner = ({ currentUser }) => {
    const [winner, setWinner] = useState('')

    useEffect(() => {
        if (currentUser.winner) {
            setWinner(currentUser.winner)
        }
    }, [])

    const handleChange = (event) => {
        const ans = event.target.value
        setWinner(ans)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(winner)
    }

    return (
        <div>
            <form onSubmit={(e) => handleSubmit(e)} >

                <h5>Enter your winner: </h5>
                <input onChange={(e) => handleChange(e)} type="text" placeholder='World Cup Winner' value={winner} />
                <button type='submit' className='btn' ></button>
            </form>
        </div>
    )
}

export default Winner