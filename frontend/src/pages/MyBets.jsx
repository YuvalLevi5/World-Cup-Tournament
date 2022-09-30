import React, { useEffect, useState } from 'react'
import { json, useNavigate } from 'react-router-dom';
import Game from '../components/Game';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { worldCupService } from '../services/world-cup-service'
import one from '../assets/imgs/fans.svg';
import two from '../assets/imgs/game-day.svg';
// import three from '../assets/imgs/goal.svg';
// import four from '../assets/imgs/soccer-player.svg';

const MyBets = () => {
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState(undefined)
  const [currentDate, setScurrentDate] = useState(undefined)
  const [currentHour, setScurrentHour] = useState(undefined)
  // const [currentMinutes, setScurrentMinutes] = useState(undefined)
  const [games, setGames] = useState([
    {
      date: '2022-11-20',
      hour: 10,
      name: 'QATvECU',
      teamOne: 'QAT',
      teamTwo: 'ECU',
      winner: 'drew',
      teamOneGoals: 2,
      teamTwoGoals: 2,
    },
    {
      date: '2022-11-20',
      hour: 16,
      name: 'ENGvIRN',
      teamOne: 'ENG',
      teamTwo: 'IRN',
      winner: undefined,
      teamOneGoals: 0,
      teamTwoGoals: 0,
    },
    {
      date: '2022-11-20',
      hour: 16,
      name: 'ENGvIRN',
      teamOne: 'ENG',
      teamTwo: 'IRN',
      winner: undefined,
      teamOneGoals: 0,
      teamTwoGoals: 0,
    },
    {
      date: '2022-11-20',
      hour: 16,
      name: 'ENGvIRN',
      teamOne: 'ENG',
      teamTwo: 'IRN',
      winner: undefined,
      teamOneGoals: 0,
      teamTwoGoals: 0,
    },
  ]);

  const toastOptions = {
    position: "top-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  }

  useEffect(() => {
    let yourDate = new Date()
    setScurrentDate(yourDate.toISOString().split('T')[0])
    setScurrentHour(yourDate.getHours())
    // setScurrentMinutes(yourDate.getMinutes())

    const interval = setInterval(() => {
      let yourDate = new Date()
      setScurrentDate(yourDate.toISOString().split('T')[0])
      setScurrentHour(yourDate.getHours())
      // setScurrentMinutes(yourDate.getMinutes())
    }, 60000);

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    async function check() {
      if (!localStorage.getItem('worldcup-app-user')) {
        navigate("/login");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem('worldcup-app-user')))
      }
    }
    check()
  }, [])

  

  useEffect(() => {
    async function setScore() {
      const scoreUser = await JSON.parse(localStorage.getItem('worldcup-app-user'))
      let addToScore = 0
      for (var i = 0; i < games.length; i++) {
        if (games[i].winner) {
          if (scoreUser.results.length > 0) {
            if (scoreUser?.results[i].isChecked === false) {
              scoreUser.results[i].isChecked = true
              if (games[i].winner === scoreUser?.results[i].winner) {
                addToScore += 2
                if (games[i].teamOneGoals === scoreUser.results[i].teamOneGoals && games[i].teamTwoGoals === scoreUser.results[i].teamTwoGoals) {
                  addToScore += 1
                }
              }
            }
          }
        }
      }
      scoreUser.score += addToScore
      await worldCupService.updateUser(scoreUser)
      setCurrentUser(scoreUser)

    }

    setScore()
  }, [])

  const handleBet = async (bet, index) => {
    try {
      currentUser.results[index] = bet
      const data = await worldCupService.updateUser(currentUser)
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          'worldcup-app-user',
          JSON.stringify(data.user)
        );
        setCurrentUser(JSON.parse(JSON.stringify(data.user)))
        toast.success('Your bet is set', toastOptions);
      }
    } catch (err) {
      console.log(err)
    }
  }



  return (
    <>
      <div className='my-bets-zone'>
        <img src={two} alt="" />
        <div>
          {
            games.map((game, index) => {
              return (
                <div key={index}>
                    <Game game={JSON.parse(JSON.stringify(game))} index={index} handleBet={handleBet} />
                  {/* {game.date === currentDate && (
                    <Game game={JSON.parse(JSON.stringify(game))} index={index} handleBet={handleBet} />
                  )} */}
                </div>
              )
            })

          }
        </div>
        <img src={one} alt="" />
      </div>
      <ToastContainer />
    </>
  )
}

export default MyBets;