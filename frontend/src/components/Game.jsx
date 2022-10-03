import React, { useState, useEffect } from 'react'
import { BiFootball } from 'react-icons/bi'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Game = ({ game, index, handleBet }) => {
    const [currentHour, setScurrentHour] = useState(undefined)
    const [ableToBet, setAbleToBet] = useState(false)
    const [teamOneGoals, setTeamOneGoals] = useState('')
    const [teamTwoGoals, setTeamTwoGoals] = useState('')

    const toastOptions = {
        position: "top-right",
        autoClose: 2500,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      }

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
        if (tagertName === 'teamOneGoals') {
            setTeamOneGoals(+event.target.value)
        } else {
            setTeamTwoGoals(+event.target.value)
        }
        // game[tagertName] = +event.target.value
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
        // if (game.teamOneGoals > game.teamTwoGoals) {
        //     winner = game.teamOne
        // } else if (game.teamTwoGoals > game.teamOneGoals) {
        //     winner = game.teamTwo
        // } else {
        //     winner = 'drew'
        // }

        const userGameBet = {
            winner: winner,
            teamOneGoals: teamOneGoals,
            teamTwoGoals: teamTwoGoals,
            isChecked: false
        }
        // const userGameBet = {
        //     winner: winner,
        //     teamOneGoals: game.teamOneGoals,
        //     teamTwoGoals: game.teamTwoGoals,
        //     isChecked: false
        // }

        await handleBet(userGameBet, index)

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
                        <input id='team-one-input' className='score-input' disabled={ableToBet} onChange={(e) => handleChange(e, index)} type="number" name='teamOneGoals' value={teamOneGoals} />
                    </div>
                    <BiFootball />
                    <div className='team-score-section'>
                        <input id='team-two-input' className='score-input' disabled={ableToBet} onChange={(e) => handleChange(e, index)} type="number" name='teamTwoGoals' value={teamTwoGoals}  />
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