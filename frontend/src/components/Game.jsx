import React, { useState, useEffect } from 'react'
import { BiFootball } from 'react-icons/bi'
const Game = ({ game, index, handleBet }) => {
    const [currentHour, setScurrentHour] = useState(undefined)
    const [ableToBet, setAbleToBet] = useState(false)

    useEffect(() => {
        let yourDate = new Date()
        let currentHour = yourDate.getHours()
        setScurrentHour(yourDate.getHours())
        if (currentHour >= game.hour) {
            setAbleToBet(true)
        }

        const interval = setInterval(() => {
            let yourDate = new Date()
            let currentHour = yourDate.getHours()
            setScurrentHour(yourDate.getHours())
            if (currentHour >= game.hour) {
                setAbleToBet(true)
            }
        }, 60000);

        return () => clearInterval(interval);

    }, [])

    const handleChange = (event, index) => {
        const tagertName = event.target.name
        game[tagertName] = +event.target.value
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        let winner
        if (game.teamOneGoals > game.teamTwoGoals) {
            winner = game.teamOne
        } else if (game.teamTwoGoals > game.teamOneGoals) {
            winner = game.teamTwo
        } else {
            winner = 'drew'
        }

        const userGameBet = {
            winner: winner,
            teamOneGoals: game.teamOneGoals,
            teamTwoGoals: game.teamTwoGoals,
            isChecked: false
        }

        handleBet(userGameBet, index)
    }


    return (

        <div className='game-zone'>
            <h2>{game.name}</h2>
            <form className='bet-form' onSubmit={(event) => handleSubmit(event)}>
                {
                    ableToBet === true && (
                        <h4>Game already started</h4>
                    )
                }
                <div className='bet-inputs'>
                    <div className='team-score-section'>
                        <label>{game.teamOne}</label>
                        <input className='score-input' disabled={ableToBet} onChange={(e) => handleChange(e, index)} type="number" name='teamOneGoals' />
                    </div>
                    <BiFootball />
                    <div className='team-score-section'>
                        <input className='score-input' disabled={ableToBet} onChange={(e) => handleChange(e, index)} type="number" name='teamTwoGoals' />
                        <label>{game.teamTwo}</label>
                    </div>
                </div>
                {
                    ableToBet === false &&
                    ( 
                        <button type="submit" className='btn succes' disabled={ableToBet} >Set Bet</button>
                    )
                }
            </form>
        </div>
    )
}

export default Game