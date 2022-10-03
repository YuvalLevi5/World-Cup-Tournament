import React, { useEffect, useState } from 'react'
import { json, useNavigate } from 'react-router-dom';
import Game from '../components/Game';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { worldCupService } from '../services/world-cup-service'
import one from '../assets/imgs/fans.svg';
import two from '../assets/imgs/game-day.svg';
import AppHeader from '../components/AppHeader';

const MyBets = () => {
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState(undefined)
  const [currentDate, setScurrentDate] = useState(undefined)
  const [games, setGames] = useState([])

  const toastOptions = {
    position: "top-right",
    autoClose: 2500,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  }

  useEffect(() => {
    let yourDate = new Date()
    setScurrentDate(yourDate.toISOString().split('T')[0])

    const interval = setInterval(() => {
      let yourDate = new Date()
      setScurrentDate(yourDate.toISOString().split('T')[0])
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
    async function getGames() {
      const worldCupGames = await worldCupService.getGames()
      setGames(worldCupGames)

    }
    getGames()
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
        toast.success(`Your bet is set to ${data.user.results[index].teamOneGoals}:${data.user.results[index].teamTwoGoals}`, toastOptions);
      }
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <>
      <AppHeader />

      <div className='my-bets-zone'>
        <img src={two} alt="" />
        <div>
          {
            games.map((game, index) => {
              return (
                <div key={index}>
                  {/* <Game game={JSON.parse(JSON.stringify(game))} index={index} handleBet={handleBet} /> */}
                  {game.date === currentDate && (
                    <Game game={JSON.parse(JSON.stringify(game))} index={index} handleBet={handleBet} />
                  )}
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