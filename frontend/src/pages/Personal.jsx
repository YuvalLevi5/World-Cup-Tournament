import React, { useEffect, useState } from 'react'
import { worldCupService } from '../services/world-cup-service';
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from 'react-router-dom';
import AppHeader from '../components/AppHeader';

const Personal = () => {
  const [currentUser, setCurrentUser] = useState(undefined)
  const [games, setGames] = useState([])
  const navigate = useNavigate()
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

  return (
    <>
      <AppHeader />

      <div className='all-bets-page'>
        <div className='table-container'>

          <table className='users-table'>
            <thead>
              <tr>
                <th>Game</th>
                <th>Your prediction</th>
              </tr>
            </thead>
            {
              games && currentUser && (
                <tbody>
                  {
                    currentUser?.results.map((res, index) => {
                      if (res?.winner) {

                        return (
                          <tr key={uuidv4()} >
                            <td>{games[index]?.name}</td>
                            <td>{res?.teamOneGoals}:{res?.teamTwoGoals} </td>

                          </tr>
                        )
                      }
                    })
                  }
                </tbody>
              )
            }
          </table>
        </div>

      </div>
    </>
  )
}

export default Personal