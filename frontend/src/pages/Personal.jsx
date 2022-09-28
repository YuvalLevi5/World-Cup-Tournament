import React, { useEffect, useState } from 'react'
import { json, useNavigate } from 'react-router-dom';
import Game from '../components/Game';

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

  let user

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
    console.log(bet)
    console.log(index)
  }

  return (
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
    </div>
  )
}

export default Personal