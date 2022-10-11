import React, { useState } from 'react'
import { useEffect } from 'react'

const TopScorrer = () => {

    const [goalScorer, setGoalScorer] = useState('')

    useEffect(() => {
        if (currentUser.goalScorer) {
            setGoalScorer(currentUser.goalScorer)
        }
    }, [])

    const handleChange = (event) => {
        const ans = event.target.value
        setGoalScorer(ans)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(goalScorer)
    }
    
  return (
    <div>
    <form onSubmit={(e) => handleSubmit(e)} >

        <h5>Enter your goalScorer: </h5>
        <input onChange={(e) => handleChange(e)} type="text" placeholder='World Cup Winner' value={goalScorer} />
        <button type='submit' className='btn' ></button>
    </form>
</div>
  )
}

export default TopScorrer