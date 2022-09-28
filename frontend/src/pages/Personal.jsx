import React, { useEffect, useState } from 'react'
import { json, useNavigate } from 'react-router-dom';
import Game from '../components/Game';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Personal = () => {
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState(undefined)
  const [games, setGames] = useState([
    {
      date: '2022-11-20',
      hour: 19,
      name: 'QATvECU',
      teamOne: 'QAT',
      teamTwo: 'ECU',
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
    }
  ]);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
}

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

  let yourDate = new Date()
  yourDate.toISOString().split('T')[0]
  yourDate.getHours()


  const handleBet = (bet, index) => {
    try {
      currentUser.results[index] = bet
      console.log(currentUser._id)
      toast.success('Your bet is set',toastOptions )
    } catch(err) {

    }
  }

  const seeUser = () => {
    console.log(currentUser)
  }

  return (
    <>
      <div>
        <div>
          {
            games.map((game, index) => {
              return (
                <div key={index}>
                  <Game game={JSON.parse(JSON.stringify(game))} index={index} handleBet={handleBet} />
                </div>
              )
            })

          }
        </div>
        {/* <button onClick={seeUser}>b;a</button> */}
      </div>
      <ToastContainer />
    </>
  )
}

export default Personal