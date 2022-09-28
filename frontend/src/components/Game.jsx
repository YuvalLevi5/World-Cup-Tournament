import React, { useState } from 'react'

const Game = ({ game, index, handleBet }) => {

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

        <div>
            <h2>{game.name}</h2>
            <div>
                <form onSubmit={(event) => handleSubmit(event)}>
                    <div>
                        <label>{game.teamOne}</label>
                        <input onChange={(e) => handleChange(e, index)} type="number" name='teamOneGoals' />
                    </div>
                    <div>
                        <label>{game.teamTwo}</label>
                        <input onChange={(e) => handleChange(e, index)} type="number" name='teamTwoGoals' />
                    </div>
                    <button type="submit">Set Bet</button>
                </form>
            </div>
        </div>
    )
}

export default Game