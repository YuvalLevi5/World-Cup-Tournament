import React, { useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BiFootball } from 'react-icons/bi'

const AdminGame = ({ game, index, handleScore }) => {
    const [teamOneGoals, setTeamOneGoals] = useState('')
    const [teamTwoGoals, setTeamTwoGoals] = useState('')

    const handleChange = (event, index) => {
        const tagertName = event.target.name
        if (tagertName === 'teamOneGoals') {
            setTeamOneGoals(+event.target.value)
        } else {
            setTeamTwoGoals(+event.target.value)
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        let winner
        if (teamOneGoals === '' || teamTwoGoals === '') {
            toast.error('Must fill all fields', toastOptions);
            return
        }
        if (teamOneGoals > teamTwoGoals) {
            winner = game.teamOne
        } else if (teamTwoGoals > teamOneGoals) {
            winner = game.teamTwo
        } else {
            winner = 'drew'
        }

        var score = {
            teamOneGoals,
            teamTwoGoals,
            winner,
            gameName: game.name
        }
        
        handleScore(score)
    }

    return (
        <div className='game-zone'>
            <h2>{game.name}</h2>
            <form className='bet-form' onSubmit={(event) => handleSubmit(event)}>
                <div className='bet-inputs'>
                    <div className='team-score-section'>
                        <label>{game.teamOne}</label>
                        <input id='team-one-input' className='score-input' onChange={(e) => handleChange(e, index)} type="number" name='teamOneGoals' value={teamOneGoals} />
                    </div>
                    <BiFootball />
                    <div className='team-score-section'>
                        <input id='team-two-input' className='score-input' onChange={(e) => handleChange(e, index)} type="number" name='teamTwoGoals' value={teamTwoGoals} />
                        <label>{game.teamTwo}</label>
                    </div>
                </div>
                <button type="submit" className='btn succes'  >Set Score</button>
            </form>
        </div>
    )
}

export default AdminGame