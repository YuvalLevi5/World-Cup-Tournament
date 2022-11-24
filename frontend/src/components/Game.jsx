import React, { useState, useEffect } from 'react'
import { BiFootball } from 'react-icons/bi'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Game = ({ game, index, handleBet, currentUser }) => {
    const [currentHour, setScurrentHour] = useState(undefined)
    const [ableToBet, setNotAbleToBet] = useState(false)
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
        let currentMinute = yourDate.getMinutes()
        setScurrentHour(yourDate.getHours())
        let currentMonth = yourDate.getMonth() + 1
        let currentDay = yourDate.getDate()
        let gameDateMonth = +game.date.substr(5, 2)
        let gameDateDay = +game.date.substr(8, 2)

        if ((currentMonth > gameDateMonth) ||
            (currentMonth === gameDateMonth && currentDay > gameDateDay) ||
            (currentHour === (game.hour - 1) && currentMinute >= 45 && currentDay === gameDateDay && currentMonth === gameDateMonth) ||
            (currentHour >= game.hour && currentDay === gameDateDay && currentMonth === gameDateMonth)) {
            setNotAbleToBet(true)
        }

        // if (currentMonth > gameDateMonth) {
        //     setNotAbleToBet(true)
        // }

        // if (currentMonth === gameDateMonth && currentDay > gameDateDay) {
        //     setNotAbleToBet(true)
        // }

        // if (currentHour === (game.hour - 1) && currentMinute >= 45 && currentDay === gameDateDay && currentMonth === gameDateMonth) {
        //     setNotAbleToBet(true)
        // }

        // if (currentHour >= game.hour && currentDay === gameDateDay && currentMonth === gameDateMonth) {
        //     setNotAbleToBet(true)
        // }



        //ORIGINAL
        // if (currentHour >= game.hour || (currentHour === (game.hour - 1) && currentMinute >= 45)) {
        //     setNotAbleToBet(true)
        // }

        const interval = setInterval(() => {
            let yourDate = new Date()
            let currentHour = yourDate.getHours()
            let currentMinute = yourDate.getMinutes()
            let currentMonth = yourDate.getMonth() + 1
            let currentDay = yourDate.getDate()
            let gameDateMonth = game.date.substr(5, 2)
            let gameDateDay = game.date.substr(8, 2)
            setScurrentHour(yourDate.getHours())

            if ((currentMonth > gameDateMonth) ||
                (currentMonth === gameDateMonth && currentDay > gameDateDay) ||
                (currentHour === (game.hour - 1) && currentMinute >= 45 && currentDay === gameDateDay && currentMonth === gameDateMonth) ||
                (currentHour >= game.hour && currentDay === gameDateDay && currentMonth === gameDateMonth)) {
                setNotAbleToBet(true)
            }

            //ORIGINAL
            // if (currentHour >= game.hour || (currentHour === (game.hour - 1) && currentMinute >= 45)) {
            //     setNotAbleToBet(true)
            // }
        }, 10000);

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


        const userGameBet = {
            winner: winner,
            teamOneGoals: teamOneGoals,
            teamTwoGoals: teamTwoGoals,
            isChecked: false
        }

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
                {
                    currentUser?.results[index]?.winner && (
                        <div>
                            <h5>Your Current Guess:</h5>
                            <p>{currentUser?.results[index].teamOneGoals}:{currentUser?.results[index].teamTwoGoals}</p>
                        </div>
                    )
                }
                <div className='bet-inputs'>
                    <div className='team-score-section'>
                        <label>{game.teamOne}</label>
                        <input id='team-one-input' className='score-input' disabled={ableToBet} onChange={(e) => handleChange(e, index)} type="number" name='teamOneGoals' value={teamOneGoals} />
                    </div>
                    <BiFootball />
                    <div className='team-score-section'>
                        <input id='team-two-input' className='score-input' disabled={ableToBet} onChange={(e) => handleChange(e, index)} type="number" name='teamTwoGoals' value={teamTwoGoals} />
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